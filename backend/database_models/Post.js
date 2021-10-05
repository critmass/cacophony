"use strict";

const db = require("../db")


class Post {

    static async create(memberId, roomId, content, threadedFrom=null);

    static async find(roomId);

    static async get(id);

    static async edit(id, newContent);

    static async delete(id);
}

module.exports = Post