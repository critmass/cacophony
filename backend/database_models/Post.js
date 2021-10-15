"use strict";

const db = require("../db")

/** Related functions for Posts */

class Post {

    /** Creates a post from data
     *
     * data should be { memberId, roomId, content }
     *
     * returns { id, memberId, roomId, content, posted_on }
     */

    static async create(memberId, roomId, content, threadedFrom=null);

    /** finds all posts to a room at roomId
     *
     * returns [{
     *              id,
     *              memberId,
     *              content,
     *              posted_on,
     *              reactions:{ [type]:[memberId, ...], ...}
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
     *              reactions:{ [type]:[memberId, ...], ...}
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
     *              reactions:{ [type]:[memberId, ...], ...}
     *          }
     */

    static async delete(id);
}

module.exports = Post