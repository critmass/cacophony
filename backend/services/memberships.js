"use strict";

/** Routes for memberships. */

const jsonschema = require("jsonschema");

const Membership = require("../database_models/Membership");
const newMembershipSchema = require("../json_schema/membershipNew.json")
const updateMemebershipSchema = require("../json_schema/membershipUpdate.json")
const { BadRequestError } = require("../expressError");


/** POST / {userId, roleId, nickname} =>
 *                                  {membership:{
 *                                      server_id,
 *                                      membership:{
 *                                          member_id
 *                                          user_id,
 *                                          role:{
 *                                              id,
 *                                              title,
 *                                              color,
 *                                              is_admin,
 *                                              access:[{
 *                                                  room_id,
 *                                                  read_only,
 *                                                  is_moderator
 *                                              }, ...]
 *                                          },
 *                                          nickname,
 *                                          join_date,
 *                                          picture_url
 *                                      }
 *                                  }}
 * */

const createMembership = async (req, res, next) => { }

/** GET / => {members:{
 *              server_id, members:[{
 *                          member_id,
 *                          role:{
 *                              id,
 *                              title,
 *                              color
 *                          },
 *                          nickname,
 *                          picture_url
 *                      }, ...]
 *          }}
 * */

const getMembers = async (req, res, next) => { }

/** GET / => {
 *              serverId,
 *              membership:{
 *                  member_id,
 *                  nickname,
 *                  role:{
 *                      id,
 *                      title,
 *                      color,
 *                      is_admin
 *                      access:[{
 *                          room_name,
 *                          room_id,
 *                          read_only,
 *                          is_moderator
 *                      }, ...]
 *                  }
 *              }
 *          }
 * */

const getMembership = async (req, res, next) => { }

/** PATCH /[memberId] { nickname, roleId } => {
 *                          serverId,
 *                          membership:{
 *                                      member_id,
 *                                      nickname,
 *                                      role:{
 *                                          role_id,
 *                                          title,
 *                                          color,
 *                                          is_admin
 *                                          access:[{
 *                                              room_name,
 *                                              room_id,
 *                                              read_only,
 *                                              is_moderator
 *                                          }, ...]
 *                                      }
 *                          }
 *                      }
 * */

const patchMembership = async (req, res, next) => { }

/** DELETE /[member_id] => {
 *                              serverId,
 *                              membership:{
 *                                      id,
 *                                      user_id,
 *                                      nickname,
 *                                      role_id
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