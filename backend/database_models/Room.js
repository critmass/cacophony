"use strict";

const db = require("../db")

/** Related functions for rooms */

class Room {

    /** Creates a room (from data), update db, return new room data.
     *
     * data should be { name, server_id, type }
     *
     * returns { id, name, server_id, type }
     */

    static async create(name, serverId, type="text") {

        const result = db.query(`
                INSERT INTO rooms (
                    name, server_id, type
                )
                VALUES ($1, $2, $3)
                RETURNING id, name, server_id, type
        `, [name, serverId, type])

        const room = result.rows[0]

        return { ...room }
    };

    /** Finds all rooms in a given server by serverId
     *
     * returns [{id, name, server_id, type}, ...]
     */

    static async find(serverId) {

        const result = db.query(`
                SELECT id, name, server_id, type
                FROM rooms WHERE server_id = $1
        `, [serverId])

        const rooms = result.rows

        return [...rooms]
    };

    /** Given a id, returns data on a room.
     *
     * returns {
     *              id,
     *              name,
     *              server_id,
     *              type,
     *              members: [{id, user_id, role_id, is_moderator}, ...],
     *              posts: [{
     *                          id,
     *                          content,
     *                          poster_id,
     *                          post_date,
     *                          threaded_from,
     *                          reactions: { [type]:[member_id, ...], ...}
     *                      }, ...]
     *          }
    */

    static async get(id) {

        const result = db.query(`
                SELECT
                    r.id AS "id",
                    r.name AS "name",
                    r.server_id AS "server_id",
                    r.type AS "type",
                    m.id AS "member_id",
                    m.user_id AS "user_id",
                    m.role_id AS "role_id",
                    a.is_moderator AS "is_moderator",
                    p.id AS "post_id",
                    p.content AS "content",
                    p.member_id AS "poster_id",
                    p.post_date AS "post_date",
                    p.threaded_from AS "threaded_from",
                    react.type AS "react_type",
                    react.member_id AS "react_member_id"
                FROM rooms r
                LEFT JOIN access a
                        ON a.room_id = r.id
                LEFT JOIN memberships m
                        ON m.role_id = a.role_id
                LEFT JOIN posts p
                        ON p.room_id = r.id
                LEFT JOIN reactions react
                        ON react.post_id = p.id
                WHERE r.id = $1

        `, [id])

        const roomInfo = {
            id:result.rows[0].id,
            name:result.rows[0].name,
            server_id:result.rows[0].server_id,
            type:result.rows[0].type
        }

        const members =
    };

    /** Removes room with id from database, returns the room data
     *
     * returns {
     *              id,
     *              name,
     *              server_id,
     *              type,
     *              members: [{member_id, user_id, role_id, is_moderator}, ...],
     *              posts: [{
     *                          id,
     *                          content,
     *                          poster_id,
     *                          post_date,
     *                          threaded_from,
     *                          reactions: { [type]:[member_id, ...], ...}
     *                      }, ...]
     *          }
     */

    static async remove(id);
}

module.exports = Room