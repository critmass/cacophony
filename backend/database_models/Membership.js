"use strict";

const db = require("../db")

/** Related functions for users */

class Membership {

    /** Creates a membership using data
     *
     * data should be
     *
     * returns {
     *              id,
     *              user_id,
     *              nickname,
     *              role:{
     *                      id,
     *                      is_admin,
     *                      title,
     *                      access:[{
     *                              room_id,
     *                              name,
     *                              color,
     *                              is_moderator
     *                      }, ...]
     *              },
     *              server_id,
     *              picture_url
     *          }
     */

    static async create(userId, roleId, picture_url=null) {

    };

    /** Finds members by server
     *
     * return [{
     *              id,
     *              nickname,
     *              user_id,
     *              role:{id, title, color},
     *              isadmin,
     *              picture_url
     *      }, ...]
    */

    static async findByServer(serverId);

    /** Finds memberships by user
     *
     * return [{
     *              id,
     *              nickname,
     *              server_id,
     *              role:{id, title},
     *              isadmin,
     *              picture_url
     *      }, ...]
    */

    static async findByUser(userId);

    /** Finds members by role
     *
     * return [{
     *              id,
     *              nickname,
     *              server_id,
     *              user_id,
     *              is_admin,
     *              picture_url
     *      }, ...]
    */

    static async findByRole(roleId);

    /** Finds members by role, user, and/or server
     *
     * return [{
     *              id,
     *              nickname,
     *              server_id,
     *              user_id,
     *              is_admin,
     *              picture_url
     *      }, ...]
    */

    static async find(userId=null, serverId=null, roleId=null);

    /** Given an id returns membership
     *
     * data should be
     *
     * returns {
     *              id,
     *              user_id,
     *              nickname,
     *              role:{
     *                      id,
     *                      is_admin,
     *                      title,
     *                      access:[{
     *                              room_id,
     *                              name,
     *                              color,
     *                              is_moderator
     *                      }, ...]
     *              },
     *              server_id,
     *              picture_url
     *          }
     */

    static async get(id);

    /** Updates the member's nickname
     *
     * returns {id, server_id, role_id, nickname}
     */

    static async updateNickname(id, newName);

    /** Updates the member's roles
     *
     * returns {id, server_id, role_id, nickname}
     */

    static async updateRole(id, newRoleId);

    /** Removes membership with given id
     *
     * returns {server_id, role_id, nickname}
     */

    static async remove(id);
}

module.exports = Membership