"use strict";

const db = require("../db")

/** Related functions for rooms */

class Room {

    /** Creates a room (from data), update db, return new room data.
     *
     * data should be { name, serverId, type }
     *
     * returns { id, name, serverId, type }
     */

    static async create(name, serverId, type="text");

    /** Finds all rooms in a given server by serverId
     *
     * returns [{id, name, serverId, type}, ...]
     */

    static async find(serverId);

    /** Given a id, returns data on a room.
     *
     * returns {
     *              id,
     *              name,
     *              serverId,
     *              type,
     *              members: [{memberId, userId, roleId, isModerator}, ...],
     *              posts: [{
     *                          postId,
     *                          content,
     *                          posterId,
     *                          postDate,
     *                          threadedFrom,
     *                          reactions: { [type]:[memberId, ...], ...}
     *                      }, ...]
     *          }
    */

    static async get(id);

    /** Removes room with id from database, returns the room data
     *
     * returns {
     *              id,
     *              name,
     *              serverId,
     *              type,
     *              members: [{memberId, userId, roleId, isModerator}, ...],
     *              posts: [{
     *                          postId,
     *                          content,
     *                          posterId,
     *                          postDate,
     *                          threadedFrom,
     *                          reactions: { [type]:[memberId, ...], ...}
     *                      }, ...]
     *          }
     */

    static async remove(id);
}

module.exports = Room