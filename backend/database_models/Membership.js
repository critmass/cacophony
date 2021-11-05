"use strict";

const db = require("../db");
const { intToColor } = require("../helpers/colorConverter");
const User = require("./User");

/** Related functions for users */

class Membership {

    /** Creates a membership using data
     *
     * data should be
     *
     * returns {
     *              id,
     *              user_id,
     *              nickname,
     *              joining_date,
     *              role:{
     *                      id,
     *                      is_admin,
     *                      title
     *              },
     *              server_id,
     *              picture_url
     *          }
     */

    static async create(userId, roleId, picture_url=null) {

        const now = new Date()

        const user = await User.get(userId)
        if(!picture_url) picture_url = user.picture_url

        const serverResult = await db.query(`
                SELECT server_id as "id"
                FROM roles
                WHERE id = $1
        `,[roleId])

        const serverInfo = serverResult.rows[0]

        const memberResult = await db.query(`
                INSERT INTO memberships (
                    user_id,
                    role_id,
                    picture_url,
                    nickname,
                    joining_date,
                    server_id
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING
                    id,
                    user_id,
                    nickname,
                    role_id,
                    server_id,
                    picture_url
        `, [
            userId,
            roleId,
            picture_url,
            user.username,
            now,
            serverInfo.id
        ])

        const roleResult = await db.query(`
                SELECT id, is_admin, title
                FROM roles
                WHERE id = $1
        `, [roleId])

        const membership = memberResult.rows[0]
        const role = roleResult.rows[0]

        return {
            id:membership.id,
            user_id:membership.user_id,
            picture_url:membership.picture_url,
            nickname:membership.nickname,
            joining_date:membership.joining_date,
            server_id:membership.server_id,
            role: {
                id:role.id,
                is_admin:role.is_admin,
                title:role.title
            }
        }
    };

    /** Finds members by server
     *
     * return [{
     *              id,
     *              nickname,
     *              user_id,
     *              role:{id, title, color:{r, b, g}, is_admin},
     *              isadmin,
     *              picture_url
     *      }, ...]
    */

    static async findByServer(serverId) {

        const result = await db.query(`
                SELECT
                    m.id AS "id",
                    m.nickname AS "nickname",
                    m.user_id AS "user_id",
                    r.id AS "role_id",
                    r.title AS "title",
                    r.color AS "color",
                    m.picture_url AS "picture_url"
                FROM memberships m
                INNER JOIN roles r ON m.role_id = r.id
                WHERE m.server_id = $1
        `, [serverId])

        return result.rows.map( row => {

            return {
                id:row.id,
                nickname:row.nickname,
                user_id:row.user_id,
                picture_url:row.picture_url,
                role:{
                    id:row.role_id,
                    title:row.title,
                    is_admin:row.is_admin,
                    color:intToColor(row.color)
                }
            }
        })
    };

    /** Finds memberships by user
     *
     * return [{
     *              id,
     *              nickname,
     *              server_id,
     *              role:{id, title, color:{r, b, g}, is_admin},
     *              picture_url
     *      }, ...]
    */

    static async findByUser(userId) {

        const result = await db.query(`
                SELECT
                    m.id AS "id",
                    m.nickname AS "nickname",
                    m.server_id AS "server_id",
                    r.is_admin AS "is_admin",
                    r.id AS "role_id",
                    r.title AS "title",
                    r.color AS "color",
                    m.picture_url AS "picture_url"
                FROM memberships m
                INNER JOIN roles r ON m.role_id = r.id
                WHERE m.user_id = $1
        `, [userId])

        return result.rows.map(row => {

            return {
                id: row.id,
                nickname: row.nickname,
                user_id: row.user_id,
                picture_url: row.picture_url,
                role: {
                    id: row.role_id,
                    title: row.title,
                    is_admin: row.is_admin,
                    color: intToColor(row.color)
                }
            }
        })
    };

    /** Finds members by role
     *
     * return [{
     *              id,
     *              nickname,
     *              server_id,
     *              user_id,
     *              picture_url
     *      }, ...]
    */

    static async findByRole(roleId) {

        const result = await db.query(`
                SELECT
                    m.id AS "id",
                    m.nickname AS "nickname",
                    m.user_id AS "user_id",
                    m.server_id AS "server_id",
                    m.picture_url AS "picture_url"
                FROM memberships m
                INNER JOIN roles r ON m.role_id = r.id
                WHERE m.role_id = $1
        `, [roleId])

        return result.rows.map(row => {

            return {
                id: row.id,
                nickname: row.nickname,
                user_id: row.user_id,
                server_id:row.server_id,
                picture_url: row.picture_url
            }
        })
    };

    // /** Finds members by role, user, and/or server
    //  *
    //  * return [{
    //  *              id,
    //  *              nickname,
    //  *              server_id,
    //  *              user_id,
    //  *              is_admin,
    //  *              picture_url
    //  *      }, ...]
    // */

    // static async find(userId=null, serverId=null, roleId=null);

    /** Given an id returns membership
     *
     * data should be
     *
     * returns {
     *              id,
     *              user_id,
     *              nickname,
     *              joining_date,
     *              role:{
     *                      id,
     *                      is_admin,
     *                      title,
     *                      color:{r, b, g},
     *                      access:[{
     *                              room_id,
     *                              room_name,
     *                              is_moderator
     *                      }, ...]
     *              },
     *              server_id,
     *              picture_url
     *          }
     */

    static async get(id) {

        const result = await db.query(`
                SELECT
                    m.id AS "id",
                    m.user_id AS "user_id",
                    m.nickname AS "nickname",
                    m.joining_date AS "joining_date",
                    m.server_id AS "server_id",
                    m.picture_url AS "picture_url",
                    r.id AS "role_id",
                    r.is_admin AS "is_admin",
                    r.title AS "title",
                    r.color AS "color",
                    a.room_id AS "room_id",
                    rooms.name AS "room_name",
                    a.is_moderator AS "is_moderator"
                FROM memberships m
                LEFT JOIN roles r ON m.role_id = r.id
                LEFT JOIN access a ON r.id = a.role_id
                LEFT JOIN rooms ON a.room_id = rooms.id
                WHERE m.id = $1
        `, [id])

        const membershipInfo = result.rows[0]

        return {
            id: membershipInfo.id,
            user_id: membershipInfo.user_id,
            nickname: membershipInfo.nickname,
            joining_date: membershipInfo.joining_date,
            server_id: membershipInfo.server_id,
            picture_url: membershipInfo.picture_url,
            role: {
                id: membershipInfo.role_id,
                is_admin: membershipInfo.is_admin,
                title: membershipInfo.title,
                color: intToColor(membershipInfo.color),
                access: result.rows.map( row => {

                    return {
                        id: row.room_id,
                        name: row.room_name,
                        is_moderator: row.is_moderator
                    }
                })
            }
        }
    };

    /** Updates the member's nickname
     *
     * returns {id, user_id, server_id, role_id, nickname}
     */

    static async updateNickname(id, newName) {

        const result = await db.query(`
                UPDATE memberships SET nickname = $2
                WHERE id = $1
                RETURNING id, user_id, server_id, role_id, nickname
        `, [id, newName])

        return {...result.rows[0]}
    };

    /** Updates the member's roles
     *
     * returns {
     *              id,
     *              server_id,
     *              user_id,
     *              role_id,
     *              nickname,
     *              picture_url,
     *              joining_date
     *          }
     */

    static async updateRole(id, newRoleId) {

        const result = await db.query(`
                UPDATE memberships SET role_id = $2
                WHERE id = $1
                RETURNING
                    id,
                    server_id,
                    user_id,
                    role_id,
                    nickname,
                    picture_url,
                    joining_date
        `, [id, newRoleId])

        return {...result.rows[0]}
    };

    /** Removes membership with given id
     *
     * returns {server_id, user_id, role_id, nickname}
     */

    static async remove(id) {

        await db.query(`
                UPDATE reactions SET member_id = NULL
                WHERE member_id = $1
        `, [id])

        await db.query(`
                UPDATE posts SET member_id = NULL
                WHERE member_id = $1
        `, [id])

        const result = await db.query(`
                DELETE FROM memberships WHERE id = $1
                RETURNING server_id, user_id, role_id, nickname
        `, [id])

        return {...result.rows[0]}
    };
}

module.exports = Membership

