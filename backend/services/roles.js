"use strict";

/** Routes for roles. */

const jsonschema = require("jsonschema");

const Role = require("../database_models/Role");
const newRoleSchema = require("../json_schema/roleNew.json");
const updateRoleSchema = require("../json_schema/roleUpdate.json")
const newAccessSchema = require("../json_schema/roleNewAccess.json")
const { BadRequestError } = require("../expressError");


/** POST / {title, color:{r,g,b}, isAdmin} =>
 *                                  {
 *                                      server_id,
 *                                      role:{
 *                                          role_id,
 *                                          title,
 *                                          color:{r,g,b},
 *                                          is_admin
 *                                      }
 *                                  }
 * */

const createRole =  async (req, res, next) => { }

/** GET / => {
 *              server_id, roles:[{
 *                          role_id,
 *                          title,
 *                          color:{r,b,g},
 *                          is_admin
 *                      }, ...]
 *          }
 * */

const getRoles = async (req, res, next) => { }

/** GET /[roleId] => {
 *                          server_id,
 *                          role:{
 *                                  role_id,
 *                                  title,
 *                                  color:{r,g,b},
 *                                  is_admin,
 *                                  members:[{nickname, member_id}, ...],
 *                                  access:[{room_id, room_name}, ...]
 *                              }
 *                      }
 * */

const getRole = async (req, res, next) => { }

/** PATCH /[roleId] {
 *                      title,
 *                      color:{r,b,g},
 *                      is_admin
 *                      } => {
 *                              serverId,
 *                              role:{
 *                                      role_id,
 *                                      title,
 *                                      color:{r,b,g},
 *                                      is_admin
 *                                  }
 *                          }
 * */

const patchRole = async (req, res, next) => { }

/** DELETE /[roleId] => {
 *                          serverId,
 *                          room:{
 *                              role_id,
 *                              title,
 *                              color:{r,b,g},
 *                              is_admin
 *                          }
 *                      }
 * */

const deleteRole =  async (req, res, next) => { }

module.exports = { getRole, getRoles, deleteRole, patchRole, createRole }