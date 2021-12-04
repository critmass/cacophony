"use strict";

/** Routes for memberships. */

const jsonschema = require("jsonschema");

const Server = require("../database_models/Server");
const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");
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
const { ensureLoggedIn } = require("../middleware/auth");

const serverNewSchema = require("../json_schema/serverNew.json")
const serverUpdateSchema = require("../json_schema/serverUpdate.json");
const Role = require("../database_models/Role");
const Membership = require("../database_models/Membership");
const Room = require("../database_models/Room");

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

router.post("/",  async (req, res, next) => {

    try {
        const validator = jsonschema.validate(req.body, serverNewSchema)
        if(validator.valid) {
            const errs = validator.errors.map( e => e.stack )
            throw new BadRequestError(errs)
        }

        const server = await Server.create(req.body)
        const adminRole = await Role.create(
            {title:"admin", serverId:server.id, isAdmin:true})
        const memberRole = await Role.create(
            {title:"admin", serverId:server.id, isAdmin:false})
        const membership = await Membership.create(
                                                req.locals.user.id,
                                                adminRole.id
                                            )
        const room = await Room.create("Main Room", server.id)
        await Role.addAccess(adminRole.id, room.id, true)

        return res.status(201).json({
            membership,
            server:{ ...server,
                roles:[adminRole, memberRole],
                rooms:[room]
            }
        })

    } catch (err) {
        next(err)
    }
})

/** GET / => {servers:[{id, name, picture_url, start_date},...]} */

router.get("/", async (req, res, next) => {

    try {

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
 *                              nickname,
 *                              membership_id,
 *                              role_id,
 *                              picture_url,
 *                              last_on
 *                          }, ...],
 *                         rooms:[{room_id, room_name, type}, ...]
 *                     }}
 * */

router.get("/:serverId", async (req, res, next) => {})

/** PATCH /[serverId] {
 *                          name,
 *                          picture_url
 *                      } => {server:{
 *                         id,
 *                         name,
 *                         picture_url,
 *                         start_date,
 *                         members:[{
 *                              nickname,
 *                              membership_id,
 *                              role_id,
 *                              picture_url,
 *                              last_on
 *                          }, ...],
 *                         rooms:[{room_id, room_name, type}, ...]
 *                     }}
 * */

router.patch("/:serverId", async (req, res, next) => {})

/** DELETE /[serverId] => {server:{
 *                              id,
 *                              name,
 *                              picture_url,
 *                              start_date,
 *                              end_date
 *                          }}
 * */

router.delete("/:serverId", async (req, res, next) => {})

router.post("/:serverId/rooms", ensureLoggedIn, createRoom)
router.get("/:serverId/rooms", getRooms)
router.get("/:serverId/rooms/:roomId",  getRoom)
router.patch("/:serverId/rooms/:roomId", patchRoom)
router.delete("/:serverId/rooms/:roomId", deleteRoom)

router.post("/:serverId/roles", createRole)
router.get("/:serverId/roles", getRoles)
router.get("/:serverId/roles/:roleId", getRole)
router.patch("/:serverId/roles/:roleId", patchRole)
router.delete("/:serverId/roles/:roleId", deleteRole)

router.post("/:serverId/members", createMembership)
router.get("/:serverId/members", getMembers)
router.get("/:serverId/members/:memberId", getMembership)
router.patch("/:serverId/members/:memberId", patchMembership)
router.delete("/:serverId/members/:memberId", deleteMembership)

module.exports = router