"use strict";

const db = require("../db")

const defaultColor = {r:255, b:255, g:255}

class Role {

    /** Creates a new role based on data
     * data should be {title, serverId, color}
     * returns {id, title, serverId, color}
     */

    static async create(title, serverId, color=defaultColor);

    /** Finds all roles on server
     * returns {
     *              id,
     *              title,
     *              server_id,
     *              color,
     *              is_admin,
     *              members:[{id, nickname, picture_url}, ...],
     *              access:[{room_id, room_name, type}, ...]
     *          }
     */

    static async find(serverId);

    /** Given an id returns a role
     *
     * returns {
     *              id,
     *              title,
     *              serverId,
     *              color,
     *              is_admin,
     *              members:[{id, nickname, picture_url}, ...],
     *              access:[{room_id, room_name, type}, ...]
     *          }
     */

    static async get(id);

    /** Updates a role based of data
     *
     * data should be {id, title, color, is_admin}
     *
     * returns { id, title, serverId, color, is_admin }
     */

    static async update(id, title=null, color=null, is_admin=null);

    /** Adds access to a room to a role
     *
     * data should be {id, roomId, isModerator}
     *
     * returns {id, room:{id, name, type}, isModerator}
     */

    static async addAccess(id, roomId, isModerator=false);

    /** Removes room access from role
     *
     * returns undefined
     */

    static async removeAccess(id, roomId);

    /** changes moderator status for a role in a room
     *
     * data should be {id, roomId, isModerator}
     *
     * returns {id, room:{id, name, type}, isModerator}
     */

    static async changeModeratorStatus(id, roomId, isModerator);

    /** Removes role
     *
     * returns undefined
     *
     * throws an error if role is not found
     *
     * throws an error if members still belong to role
     */

    static async remove(id);
}

module.exports = Role