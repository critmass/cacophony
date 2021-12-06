const bcrypt = require("bcrypt")
const Membership = require("../../database_models/Membership")
const Post = require("../../database_models/Post")
const Role = require("../../database_models/Role")
const Room = require("../../database_models/Room")
const Server = require("../../database_models/Server")
const User = require("../../database_models/User")

const db = require("../../db")
const { createToken } = require("../../helpers/tokens")
const { resetDB } = require("../_resetDB")

const defaultImgURL = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
const defaultTime = new Date(2024, 10, 1, 12, 43, 55, 0)
const defaultColor1 = { r:255, b:255, g:0   }
const defaultColor2 = { r:0,   b:0,   g:255 }

const commonBeforeAll = async () => {

    await resetDB()

    await User.create({
        username:"user1",
        password:"password1",
        pictureUrl:defaultImgURL
    }) //ID:1
    await User.create({
        username:"user2",
        password:"password1",
        pictureUrl:defaultImgURL
    }) //ID:2
    await User.create({
        username:"user3",
        password:"password1",
        pictureUrl:defaultImgURL,
        isSiteAdmin:true
    }) //ID:3
    await User.create({
        username:"user4",
        password:"password1",
        pictureUrl:defaultImgURL,
        isSiteAdmin:false
    }) //ID:4
    await User.create({
        username:"user5",
        password:"password1",
        pictureUrl:defaultImgURL,
        isSiteAdmin:true
    }) //ID:5

    await Server.create({name:"server1", pictureUrl:defaultImgURL}) //ID:1
    await Server.create({name:"server2", pictureUrl:defaultImgURL}) //ID:2
    await Server.create({name:"server3", pictureUrl:defaultImgURL}) //ID:3

    await Room.create("room11", 1) //ID:1
    await Room.create("room12", 1) //ID:2
    await Room.create("room21", 2) //ID:3
    await Room.create("room22", 2) //ID:4
    await Room.create("room31", 3) //ID:5
    await Room.create("room32", 3) //ID:6
    await Room.create("room13", 1) //ID:7

    /** ID:1 */
    await Role.create({
        title:"role1a",
        serverId:1,
        color:defaultColor1,
        isAdmin:true
    })
    /** ID:2 */
    await Role.create({
        title:"role1m",
        serverId:1,
        color:defaultColor2,
        isAdmin:false
    })
    /** ID:3 */
    await Role.create({
        title:"role2a",
        serverId:2,
        color:defaultColor1,
        isAdmin:true
    })
    /** ID:4 */
    await Role.create({
        title:"role2m",
        serverId:2,
        color:defaultColor2,
        isAdmin:false
    })
    /** ID:5 */
    await Role.create({
        title:"role3a",
        serverId:3,
        color:defaultColor1,
        isAdmin:true
    })
    /** ID:6 */
    await Role.create({
        title:"role3m",
        serverId:3,
        color:defaultColor2,
        isAdmin:false
    })
    /** ID:7 */
    await Role.create({
        title:"role to be deleted",
        serverId:1,
        color:defaultColor1,
        isAdmin:false
    })

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

const user1Token = createToken({id:1, username:"user1"})
const user2Token = createToken({id:2, username:"user2"})
const user3Token = createToken({id:3, username:"user3", isSiteAdmin:true})
const user4Token = createToken({id:4, username:"user4"})
const user5Token = createToken({id:5, username:"user5", isSiteAdmin:true})

module.exports = {
    commonAfterAll, commonAfterEach, commonBeforeAll, commonBeforeEach,
    defaultTime, defaultImgURL,   defaultColor1,   defaultColor2,
    user1Token, user2Token, user3Token, user4Token, user5Token
}