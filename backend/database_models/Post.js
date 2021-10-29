"use strict";

const db = require("../db")

/** Related functions for Posts */

class Post {

    /** Creates a post from data
     *
     * data should be { memberId, roomId, content }
     *
     * returns { id, member_id, room_id, content, posted_on }
     */

    static async create(memberId, roomId, content, threadedFrom=null) {

        const result = db.query(`

        `)
    };

    /** finds all posts to a room at roomId
     *
     * returns [{
     *              id,
     *              memberId,
     *              content,
     *              posted_on,
     *              reactions:{ [type]:[member_id, ...], ...}
     *          }, ...]
     */

    static async find(roomId);

    /** Given an id returns a post
     *
     * returns {
     *              id,
     *              memberId,
     *              content,
     *              posted_on,
     *              reactions:{ [type]:[member_id, ...], ...}
     *          }
     */

    static async get(id);

    /** Removes post with id
     *
     * returns {
     *              id,
     *              memberId,
     *              content,
     *              posted_on,
     *              reactions:{ [type]:[member_id, ...], ...}
     *          }
     */

    static async delete(id);
}

module.exports = Post