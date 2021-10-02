"use strict";

const db = require("../db")


class Membership {

    static async create(userId, roleId);

    static async find(userId=null, roleId=null, serverId=null);

    static async get(id);

    static async updateNickname(id, newName);

    static async updateRole(id, newRoleId);

    static async updateSettings(id, newSettings);

    static async remove(id);
}

module.exports = Membership