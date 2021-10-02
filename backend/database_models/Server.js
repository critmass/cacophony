"use strict";

const db = require("../db")


class Server {

    static async create(serverName, picture_url=null);

    static async find(serverName=null);

    static async get(id);

    static async getRooms(id);

    static async getMembers(id);

    static async getRoles(id);

    static async updateName(id, newName);

    static async updateSetting(id, newSettings);

    static async delete(id);
}

module.exports = Server