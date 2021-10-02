"use strict";

const db = require("../db")


class Role {

    static async create(title, serverId);

    static async find(serverId);

    static async get(id);

    static async update(id, updates);

    static async addAccess(id, roomId, isModerator=false);

    static async removeAccess(id, roomId);

    static async updateModeratorStatus(id, roomId, isModerator);

    static async remove(id);
}

module.exports = Role