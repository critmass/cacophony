const bcrypt = require("bcrypt")
const Membership = require("../../database_models/Membership")
const Post = require("../../database_models/Post")
const Role = require("../../database_models/Role")
const Room = require("../../database_models/Room")
const Server = require("../../database_models/Server")
const User = require("../../database_models/User")

const db = require("../../db")
const { timeJSToSQL } = require("../../helpers/timeConverter")

const defaultImgURL = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
const defaultTimeJS = new Date(2024, 10, 1, 12, 43, 55, 0)
const defaultTimeSQL = timeJSToSQL(defaultTimeJS)
const defaultColor1 = { r:255, b:255, g:0 }
const defaultColor2 = { r:0, b:0, g:255 }

const commonBeforeAll = async () => {

    await db.query("DELETE FROM reactions")
    await db.query("DELETE FROM posts")
    await db.query("DELETE FROM memberships")
    await db.query("DELETE FROM access")
    await db.query("DELETE FROM rooms")
    await db.query("DELETE FROM roles")
    await db.query("DELETE FROM users")
    await db.query("DELETE FROM servers")
    await db.query("DELETE FROM invites")

    await db.query("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE servers_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE rooms_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE roles_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE memberships_id_seq RESTART WITH 1")

    await User.register("u1", "password1", defaultImgURL) //ID:1
    await User.register("u2", "password1", defaultImgURL) //ID:2
    await User.register("u3", "password1", defaultImgURL) //ID:3

    await Server.create("s1", defaultImgURL) //ID:1
    await Server.create("s2", defaultImgURL) //ID:2
    await Server.create("s3", defaultImgURL) //ID:3

    await Room.create("room11", 1) //ID:1
    await Room.create("room12", 1) //ID:2
    await Room.create("room21", 2) //ID:3
    await Room.create("room22", 2) //ID:4
    await Room.create("room31", 3) //ID:5
    await Room.create("room32", 3) //ID:6
    await Room.create("room13", 1) //ID:7

    await Role.create("r1a", 1, defaultColor1) //ID:1
    await Role.create("r1m", 1, defaultColor2) //ID:2
    await Role.create("r2a", 2, defaultColor1) //ID:3
    await Role.create("r2m", 2, defaultColor2) //ID:4
    await Role.create("r3a", 3, defaultColor1) //ID:5
    await Role.create("r3m", 3, defaultColor2) //ID:6

    await Role.addAccess(1, 1, true ) //ID:1
    await Role.addAccess(1, 2, true ) //ID:2
    await Role.addAccess(2, 1, false) //ID:3
    await Role.addAccess(2, 2, false) //ID:4

    await Membership.create(1, 1, defaultImgURL) //ID:1
    await Membership.create(2, 2, defaultImgURL) //ID:2
    await Membership.create(3, 2, defaultImgURL) //ID:3
    await Membership.create(1, 4, defaultImgURL) //ID:4
    await Membership.create(2, 3, defaultImgURL) //ID:5
    await Membership.create(3, 4, defaultImgURL) //ID:6
    await Membership.create(1, 6, defaultImgURL) //ID:7
    await Membership.create(2, 6, defaultImgURL) //ID:8
    await Membership.create(3, 5, defaultImgURL) //ID:9

    await Post.create(1, 1, "post 1") //ID:1
    await Post.create(2, 1, "post 2") //ID:2
    await Post.create(3, 1, "post 3") //ID:3

}

const commonBeforeEach = async () => {
    await db.query("BEGIN")
}

const commonAfterEach = async () => {
    await db.query("ROLLBACK")
}

const commonAfterAll = async () => {
    await db.end()
}

module.exports = {
    commonAfterAll, commonAfterEach, commonBeforeAll, commonBeforeEach,
    defaultTimeSQL, defaultImgURL,   defaultColor1,   defaultColor2
}