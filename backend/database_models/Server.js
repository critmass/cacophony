"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for Server */

class Server {

    /** Creates a room (from data), update db, return new server info
     * data should be {serverName, picture_url}
     * returns {id, name, picture_url}
     */

    static async create(serverName, picture_url=null) {

        const now = new Date()

        const result = await db.query(`
                INSERT INTO servers (name, picture_url, start_date)
                VALUES ($1, $2, $3)
                RETURNING id, name, picture_url, start_date
        `, [serverName, picture_url, now])

        const user = result.rows[0]

        return {
            id:user.id,
            name:user.name,
            picture_url:user.picture_url,
            start_date:user.start_date
        }
    };

    /** Finds all servers
     * returns [{id, name, picture_url, number_of_members}, ...]
     */

    static async findAll() {

        const result = await db.query(`
                SELECT
                    s.id AS "id",
                    s.name AS "name",
                    s.picture_url AS "picture_url",
                    COUNT( m.id ) as "number_of_members"
                FROM servers s
                LEFT JOIN memberships m
                    ON m.server_id = s.id
                GROUP BY s.id
        `)

        return result.rows.map( row => {
            return {
                id:row.id,
                name:row.name,
                picture_url:row.picture_url,
                number_of_members:row.number_of_members
            }
        })
    };

    /** Finds all servers with serverName
     * return [{id, name, picture_url, number_of_members}, ...]
     * returns Server.findAll() if null is pasted in
     * throws error if no servers found
    */

    static async find(serverName=null) {

        if( serverName === null ) return Server.findAll()

        const result = await db.query(`
                SELECT
                    s.id AS "id",
                    s.name AS "name",
                    s.picture_url AS "picture_url",
                    COUNT( m.id ) as "number_of_members"
                FROM servers s
                LEFT JOIN memberships m
                    ON m.server_id = s.id
                WHERE s.name = $1
                GROUP BY s.id

        `, [serverName])

        if(!result.rows[0].id) throw new NotFoundError("no servers with that name")

        return result.rows.map(row => {
            return {
                id: row.id,
                name: row.name,
                picture_url: row.picture_url,
                number_of_members: row.number_of_members
            }
        })
    };

    /** Gets server by id
     * returns {
     *              id,
     *              name,
     *              picture_url,
     *              rooms:[{id, name, type}, ...],
     *              roles:[{id, title, is_admin}, ...],
     *              members:[{id, user_id, nickname, picture_url}, ...]
     *          }
     */

    static async get(id) {

        let result = await db.query(`
                SELECT id, name, picture_url FROM servers
                WHERE id = $1
        `, [id])

        const serverInfo = result.rows[0]

        result = await db.query(`
            SELECT id, title, is_admin FROM roles
            WHERE server_id = $1
        `, [id])

        const roles = [...result.rows]

        result = await db.query(`
            SELECT id, name, type FROM rooms
            WHERE server_id = $1
        `, [id])

        const rooms = [...result.rows]

        result = await db.query(`
            SELECT id, user_id, nickname, picture_url FROM memberships
            WHERE server_id = $1
        `, [id])

        const members = [...result.rows]

        return {
            id:serverInfo.id,
            name:serverInfo.name,
            picture_url:serverInfo.picture_url,
            rooms,
            roles,
            members
        }
    };

    /** Updates a name of server
     *
     * data required {id, newName}
     *
     * returns {id, name, picture_url}
     *
     * throws an error if id not found
     */

    static async updateName(id, newName) {

        const result = db.query(`
                UPDATE servers SET name = $2
                WHERE id = $1
                RETURNING id, name, picture_url
        `, [id, newName])

        if( !result.rows[0].id ) throw NotFoundError("no id found")

        return {...result.rows[0]}
    };

    /** Updates a picture url of server
     *
     * data required {id, newPictureUrl}
     *
     * returns {id, name, picture_url}
     *
     * throws an error if id not found
     */

    static async updatePictureUrl(id, newPictureUrl) {

        const result = await db.query(`
                UPDATE servers SET picture_url = $2
                WHERE id = $1
                RETURN id, name, picture_url
        `, [id, newPictureUrl])

        if (!result.rows[0].id) throw NotFoundError("no id found")

        return { ...result.rows[0] }
    };

    /** Removes server with id from database
     *
     * returns {name, picture_url}
     *
     * throws an error if id not found
     */

    static async delete(id) {

        await db.query(`
            DELETE FROM reactions
            WHERE post_id = ANY (
                SELECT p.id FROM posts p
                INNER JOIN rooms r ON p.room_id = r.id
                WHERE r.server_id = $1
            )
        `, [id])

        await db.query(`
            DELETE FROM posts
            WHERE room_id = ANY (
                SELECT id FROM rooms
                WHERE server_id = $1
            )
        `, [id])

        await db.query(`
            DELETE FROM access
            WHERE room_id = ANY (
                SELECT id FROM rooms
                WHERE server_id = $1
            )
        `,[id])

        await db.query(`
            DELETE FROM memberships
            WHERE server_id = $1
        `, [id])

        await db.query(`
            DELETE FROM roles
            WHERE server_id = $1
        `, [id])

        await db.query(`
            DELETE FROM rooms
            WHERE server_id = $1
        `,[id])

        const result = await db.query(`
                DELETE FROM servers
                WHERE id = $1
                RETURNING name, picture_url, start_date
        `,[id])

        const deletedServerData = result.rows[0]

        if (!deletedServerData) throw new NotFoundError("no id found")

        console.log(deletedServerData)

        return {
            name: deletedServerData.name,
            picture_url: deletedServerData.picture_url,
            start_date:deletedServerData.start_date
        }
    };
}

module.exports = Server