"use strict";

/** Routes for memberships. */

const jsonschema = require("jsonschema");

const Server = require("../database_models/Server");
const express = require("express");
const router = new express.Router();
const serverSchema = require("../json_schema/serverNew.json")
const { BadRequestError } = require("../expressError");
const { createRoom, getRooms, getRoom, patchRoom, deleteRoom } = require("./rooms");
const { createRole, getRoles, getRole, patchRole, deleteRole } = require("./roles");
const { createMembership, getMembers, getMembership, patchMembership, deleteMembership } = require("./memberships");

/** POST / {newServer} => {server:{id, name, picture_url, start_date}} */

router.post("/",  async (req, res, next) => {})

/** GET / => {servers:[{id, name, picture_url, start_date},...]} */

router.get("/", async (req, res, next) => {})

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

/** PATCH /[serverId] => {server:{id, name, picture_url}} */

router.patch("/:serverId", async (req, res, next) => {})

/** DELETE /[serverId] => {server:{
 *                              id,
 *                              name,
 *                              picture_url,
 *                              start_date,
 *                              end_date
 *                          }} */

router.delete("/:serverId", async (req, res, next) => {})

router.post("/:serverId/rooms", createRoom)
router.get("/:serverId/rooms", getRooms)
router.get("/:serverId/rooms/:roomId", getRoom)
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