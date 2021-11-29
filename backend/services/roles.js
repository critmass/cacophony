"use strict";

/** Routes for roles. */

const jsonschema = require("jsonschema");

const Role = require("../database_models/Role");
const newRoleSchema = require("../json_schema/roleNew.json");
const updateRoleSchema = require("../json_schema/roleUpdate.json")
const newAccessSchema = require("../json_schema/roleNewAccess.json")
const { BadRequestError } = require("../expressError");


/** POST / {title, color, is_admin} =>
 *                                  {
 *                                      server_id,
 *                                      role:{
 *                                          role_id,
 *                                          title,
 *                                          color,
 *                                          is_admin
 *                                      }
 *                                  }
 * */

const createRole =  async (req, res, next) => { }

/** GET / => {
 *              serverId, roles:[{
 *                          role_id,
 *                          title,
 *                          color,
 *                          is_admin
 *                      }, ...]
 *          }
 * */

const getRoles = async (req, res, next) => { }

/** GET /[role_id] => {
 *                          serverId,
 *                          role:{
 *                                  role_id,
 *                                  title,
 *                                  color,
 *                                  is_admin,
 *                                  members:[{nickname, member_id}, ...],
 *                                  access:[{room_id, room_name}, ...]
 *                              }
 *                      }
 * */

const getRole = async (req, res, next) => { }

/** PATCH /[role_id] {
 *                          role_id,
 *                          title,
 *                          color,
 *                          is_admin
 *                      } => {
 *                              serverId,
 *                              role:{
 *                                      role_id,
 *                                      title,
 *                                      color,
 *                                      is_admin
 *                                  }
 *                          }
 * */

const patchRole = async (req, res, next) => { }

/** DELETE /[role_id] => {
 *                          serverId,
 *                          room:{
 *                              role_id,
 *                              title,
 *                              color,
 *                              is_admin
 *                          }
 *                      }
 * */

const deleteRole =  async (req, res, next) => { }

module.exports = { getRole, getRoles, deleteRole, patchRole, createRole }