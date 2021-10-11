"use strict";

/** Routes for rooms. */

const jsonschema = require("jsonschema");

const Room = require("../database_models/Room");
const express = require("express");
const router = new express.Router();
const newRoomSchema = require("../json_schema/roomNew.json")
const { BadRequestError } = require("../expressError");

/** POST / {room_name} => {room:{room_id}} */

const createRoom = async (req, res, next) => { }

/** GET / => {serverId, rooms:[{room_id, room_name, type}, ...]} */

const getRooms =  async (req, res, next) => { }

/** GET /[room_id] => {room:{
 *                          room_id,
 *                          room_name,
 *                          type,
 *                          members:[{
 *                              membership_id,
 *                              nickname
 *                          }, ...]
 *                      }}
 * */

const getRoom = async (req, res, next) => { }

/** PATCH /[room_id] {room_id, new_name} => {
 *                                      serverId,
 *                                      room:{room_id, room_name, type}
 *                                  }
 * */

const patchRoom =  async (req, res, next) => { }

/** DELETE /[room_id] => {serverId, room:{room_id, room_name, type}} */

const deleteRoom = async (req, res, next) => { }

/** WS /[room_id] => a websocket connection to the room at room_id */

const roomWebsocket = async (ws, req, next) => { }

module.exports = {
                createRoom,
                getRoom,
                getRooms,
                patchRoom,
                deleteRoom,
                roomWebsocket
            }