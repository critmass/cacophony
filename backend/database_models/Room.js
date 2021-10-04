"use strict";

const db = require("../db")


class Room {

    static async create(name, serverId, type="text");

    static async find(serverId);

    static async get(id);

    static async updateSetting(id, newSettings);

    static async remove(id);
}

module.exports = Room