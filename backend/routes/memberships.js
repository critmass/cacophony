"use strict";

/** Routes for memberships. */

const jsonschema = require("jsonschema");

const Membership = require("../database_models/Membership");
const newMembershipSchema = require("../json_schema/membershipNew.json")
const updateMemebershipSchema = require("../json_schema/membershipUpdate.json")
const { BadRequestError } = require("../expressError");


/** POST / {user_id, role_id, nickname} =>
 *                                  {
 *                                      server_id,
 *                                      membership:{
 *                                          member_id
 *                                          user_id,
 *                                          role_id,
 *                                          nickname,
 *                                          join_date,
 *                                          picture_url
 *                                      }
 *                                  }
 * */

const createMembership = async (req, res, next) => { }

/** GET / => {
 *              serverId, members:[{
 *                          member_id,
 *                          user_id,
 *                          role_id,
 *                          nickname,
 *                          picture_url
 *                      }, ...]
 *          }
 * */

const getMembers = async (req, res, next) => { }

/** GET /[member_id] => {
 *                          serverId,
 *                          membership:{
 *                                  membership_id,
 *                                  nickname,
 *                                  user_id,
 *                                  picture_url,
 *                                  role:{role_id, title, color},
 *                                  access:[{room_name, room_id}, ...]
 *                          }
 *                      }
 * */

const getMembership = async (req, res, next) => { }

/** PATCH /[member_id] {role_id, nickname} => {
 *                                              serverId,
 *                                              membership:{
 *                                                      member_id,
 *                                                      user_id,
 *                                                      nickname,
 *                                                      role:{
 *                                                            role_id,
 *                                                            title,
 *                                                            color,
 *                                                            is_admin
 *                                                        }
 *                                                      access:[{
 *                                                          room_name,
 *                                                          room_id
 *                                                      }, ...]
 *                                              }
 *                                          }
 * */

const patchMembership = async (req, res, next) => { }

/** DELETE /[member_id] => {
 *                              serverId,
 *                              membership:{
 *                                      member_id,
 *                                      user_id,
 *                                      nickname,
 *                                      role:{
 *                                              role_id,
 *                                              title,
 *                                              color,
 *                                              is_admin
 *                                          }
 *                                      access:[{
 *                                          room_name,
 *                                          room_id
 *                                      }, ...]
 *                              }
 *                          }
 * */

const deleteMembership = async (req, res, next) => { }

module.exports = {
                createMembership,
                getMembers,
                getMembership,
                patchMembership,
                deleteMembership
            }