"use strict";

const db = require("../db")

const defaultColor = {r:255, b:255, g:255}

class Role {

    static async create(title, serverId, color=defaultColor);

    static async find(serverId);

    static async get(id);

    static async update(id, updates);

    static async addAccess(id, roomId, isModerator=false);

    static async removeAccess(id, roomId);

    static async changeModeratorStatus(id, roomId, isModerator);

    static async remove(id);
}

module.exports = Role