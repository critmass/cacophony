"use strict";

const db = require("../db")


class Membership {

    static async create(userId, roleId, picture_url=null);

    static async findByServer(serverId);

    static async findByUser(userId);

    static async findByRole(roleId);

    static async get(id);

    static async updateNickname(id, newName);

    static async updateRole(id, newRoleId);

    static async updateSettings(id, newSettings);

    static async remove(id);
}

module.exports = Membership