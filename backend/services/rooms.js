"use strict";

/** Routes for rooms. */

const jsonschema = require("jsonschema");

const Room = require("../database_models/Room");
const express = require("express");
const router = new express.Router();
const newRoomSchema = require("../json_schema/roomNew.json")
const { BadRequestError } = require("../expressError");

/** POST / {name, type} => {room:{id, name, type}} */

const createRoom = async (req, res, next) => { }

/** GET / => {serverId, rooms:[{id, name, type}, ...]} */

const getRooms =  async (req, res, next) => { }

/** GET /[roomId] => {room:{
 *                          id,
 *                          name,
 *                          type,
 *                          members:[{
 *                              id,
 *                              nickname,
 *                              color,
 *                              access:{read_only, is_moderator}
 *                          }, ...]
 *                      }}
 * */

const getRoom = async (req, res, next) => { }

/** PATCH /[roomId] { name } => {
 *                                  server_id,
 *                                  room:{id, name, type}
 *                                  members:[{
 *                                             id,
 *                                             nickname,
 *                                             color,
 *                                             access:{read_only, is_moderator}
 *                                         }, ...]
 *                              }
 * */

const patchRoom =  async (req, res, next) => { }

/** DELETE /[roomId] => {server_id, room:{room_id, room_name, type}} */

const deleteRoom = async (req, res, next) => { }

/** WS /[roomId] => a websocket connection to the room at roomId */

const roomWebsocket = async (ws, req, next) => { }

module.exports = {
                createRoom,
                getRoom,
                getRooms,
                patchRoom,
                deleteRoom,
                roomWebsocket
            }