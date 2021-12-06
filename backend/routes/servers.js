"use strict";

/** Routes for memberships. */

const jsonschema = require("jsonschema");

const Server = require("../database_models/Server");
const Role = require("../database_models/Role");
const Membership = require("../database_models/Membership");
const Room = require("../database_models/Room");

const express = require("express")
const router = express.Router();
const { BadRequestError, NotFoundError } = require("../expressError");
const {
    createRoom,
    getRooms,
    getRoom,
    patchRoom,
    deleteRoom
} = require("../services/rooms");
const {
    createRole,
    getRoles,
    getRole,
    patchRole,
    deleteRole
} = require("../services/roles");
const {
    createMembership,
    getMembers,
    getMembership,
    patchMembership,
    deleteMembership
} = require("../services/memberships");
const {
    ensureLoggedIn, ensureIsMemberOrSiteAdmin, ensureIsServerAdmin, ensureIsServerOrSiteAdmin, ensureIsServerMember, ensureIsServerAdminOrCurrentUser
} = require("../middleware/auth");

const serverNewSchema = require("../json_schema/serverNew.json")
const serverUpdateSchema = require("../json_schema/serverUpdate.json");
const User = require("../database_models/User");
const { throws } = require("assert");


/** POST / {
 *          serverName,
 *          pictureUrl
 *          } => {  membership:{
 *                         id,
 *                         user_id,
 *                         nickname,
 *                         joining_date,
 *                         role:{
 *                                 id,
 *                                 is_admin,
 *                                 title,
 *                                 color
 *                         },
 *                         server_id,
 *                         picture_url
 *                  }
 *                  server:{
 *                         id,
 *                         name,
 *                         picture_url,
 *                         start_date,
 *                         roles:[{id, title, color}, ...]
 *                         rooms:[{id, name, type}]
 *                  }
 *              }
 * */

router.post("/", ensureLoggedIn, async (req, res, next) => {

    try {
        const validator = jsonschema.validate(req.body, serverNewSchema)
        if(!validator.valid) {
            const errs = validator.errors.map( e => e.stack )
            throw new BadRequestError(errs)
        }
        const server = await Server.create(req.body)
        const adminRole = await Role.create(
            {title:"admin" , serverId:server.id, isAdmin:true })
        const memberRole = await Role.create(
            {title:"member", serverId:server.id, isAdmin:false})
        const membership = await Membership.create(
                                                    res.locals.user.id,
                                                    adminRole.id
                                                )
        const room = await Room.create("Main Room", server.id)
        await Role.addAccess(adminRole.id, room.id, true)
        const data = {
                membership,
                server: {
                    ...server,
                    roles: [adminRole, memberRole],
                    rooms: [room]
                }
        }
        return res.status(201).json(data)

    } catch (err) {
        next(err)
    }
})

/** GET / => {servers:[{
 *                      id,
 *                      name,
 *                      picture_url,
 *                      start_date,
 *                      number_of_members
 *              },...]
 *          }
 * */

router.get("/", ensureLoggedIn, async (req, res, next) => {

    try {
        const servers = await Server.findAll()
        return res.status(200).json({servers})
    } catch (err) {
        next(err)
    }
})

/** GET /[serverId] => {server:{
 *                         id,
 *                         name,
 *                         picture_url,
 *                         start_date,
 *                         members:[{
 *                              id,
 *                              nickname,
 *                              role:{
 *                                  id,
 *                                  title,
 *                                  color
 *                              },
 *                              picture_url,
 *                              joining_date
 *                          }, ...],
 *                         rooms:[{room_id, room_name, type}, ...]
 *                     }}
 * */

router.get("/:serverId", ensureIsMemberOrSiteAdmin, async (req, res, next) => {
    try {
        const serverInfo = await Server.get(req.params.serverId)
        // console.info(serverInfo)
        const roleMap = serverInfo.roles.reduce( (map, role) => {
            map.set(role.id, role)
            return map
        }, new Map())
        const server = {
            id:serverInfo.id,
            name:serverInfo.name,
            picture_url:serverInfo.picture_url,
            members:serverInfo.members.map( member => {
                return {
                    id:member.id,
                    nickname:member.nickname,
                    role:roleMap.get(member.role_id),
                    picture_url:member.picture_url,
                    joining_date:member.joining_date
                }
            }),
            rooms:serverInfo.rooms
        }
        // console.info(server)

        return res.status(200).json({server})
    } catch (err) {
        next(err)
    }
})

/** PATCH /[serverId] {
 *                      name,
 *                      picture_url
 *                  } => {server:{
 *                          id,
 *                          name,
 *                          picture_url,
 *                          start_date
 *                     }}
 * */

router.patch("/:serverId", ensureIsServerAdmin, async (req, res, next) => {
    try {
        const validator = jsonschema.validate(
                                        req.body, serverUpdateSchema)
        if(!validator.valid) throw new BadRequestError()

        const server = await Server.update(req.params.serverId, req.body)
        return res.status(201).json({server})
    } catch (err) {
        next(err)
    }
})

/** DELETE /[serverId] => {server:{
 *                              id,
 *                              name,
 *                              picture_url,
 *                              start_date,
 *                              end_date
 *                          }}
 * */

router.delete("/:serverId", ensureIsServerOrSiteAdmin,
    async (req, res, next) => {
        try {
            const server = await Server.delete(req.params.serverId)
            return res.status(201).json({server})
        } catch (err) {
            next(err)
        }
})

router.post("/:serverId/rooms", ensureIsServerAdmin, createRoom)
router.get("/:serverId/rooms", ensureIsServerMember, getRooms)
router.get("/:serverId/rooms/:roomId", ensureIsServerMember,  getRoom)
router.patch("/:serverId/rooms/:roomId", ensureIsServerAdmin, patchRoom)
router.delete("/:serverId/rooms/:roomId", ensureIsServerAdmin, deleteRoom)

router.post("/:serverId/roles", ensureIsServerAdmin, createRole)
router.get("/:serverId/roles", ensureIsServerMember, getRoles)
router.get("/:serverId/roles/:roleId", ensureIsServerAdmin, getRole)
router.patch("/:serverId/roles/:roleId", ensureIsServerAdmin, patchRole)
router.delete("/:serverId/roles/:roleId", ensureIsServerAdmin, deleteRole)

router.post("/:serverId/members", ensureIsServerAdmin, createMembership)
router.get("/:serverId/members", ensureIsServerMember, getMembers)
router.get("/:serverId/members/:memberId",
                ensureIsServerMember, getMembership)
router.patch("/:serverId/members/:memberId",
                ensureIsServerAdminOrCurrentUser, patchMembership)
router.delete("/:serverId/members/:memberId",
                ensureIsServerAdminOrCurrentUser, deleteMembership)

module.exports = router