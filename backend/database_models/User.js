"use strict";

const db = require("../db")
const bcrypt = require("bcrypt")


class User {

    static async authenticate(id, password)

    static async register( username, password, picture_url=null )

    static async find(username=null)

    static async findAll()

    static async get(id)

    static async updateLastOn(id)

    static async changeUsername(id, newUsername)

    static async changePassword(id, newPassword)

    static async remove(id)
}

module.exports = User