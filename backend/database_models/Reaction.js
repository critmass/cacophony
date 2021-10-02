"use strict";

const db = require("../db")


class Reaction {

    static async create(memberId, postId, type);

    static async find(postId);

    static async get(id);

    static async remove(id);
}

module.exports = Reaction