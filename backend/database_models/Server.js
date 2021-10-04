"use strict";

const db = require("../db")


class Server {

    static async create(serverName, picture_url=null);

    static async findAll();

    static async find(serverName=null);

    static async get(id);

    static async getRooms(id);

    static async getMembers(id);

    static async getRoles(id);

    static async update(id, {newName=null, newSettings=null});

    static async delete(id);
}

module.exports = Server