"use strict";

const db = require("../db")
const bcrypt = require("bcrypt")

/** Related functions for users */

class User {

    /** checks if the password and id are linked
     *
     * returns {
     *              id,
     *              username,
     *              picture_url,
     *              last_on,
     *              joining_date,
     *              is_site_admin,
     *              memberships:[{
     *                      id,
     *                      nickname,
     *                      server:{
     *                          Id,
     *                          name,
     *                          picture_url,
     *                          rooms:[{
     *                              id,
     *                              access,
     *                              type
     *                          }, ...],
     *                      },
     *                      role:{ id, title, color },
     *              }, ...]
     *          }
     */

    static async authenticate(id, password)

    /** Registers a user from the data provided
     * data should be { username, password, picture_url }
     * returns { id, username, picture_url }
     */

    static async register( username, password, picture_url=null )

    /** finds all users with username
     * returns [{ id, username, picture_url }, ...]
     * throws error if no user exists
     * executes User.findAll() if null is passed in
     */

    static async find(username=null)

    /** finds all users
     * returns [{id, username, picture_url}, ...]
     */

    static async findAll()

    /** Given a id, returns data on a room.
     *
     * returns {
     *              id,
     *              username,
     *              picture_url,
     *              last_on,
     *              joining_date,
     *              is_site_admin,
     *              memberships:[{
     *                      id,
     *                      nickname,
     *                      server:{
     *                          Id,
     *                          name,
     *                          picture_url
     *                      },
     *                      role:{ id, title, color },
     *              }, ...]
     *          }
     */

    static async get(id)

    /** Updates the last_on of a user to current time with the given id
     * returns {id, last_on}
     */

    static async updateLastOn(id)

    /** Updates the username of user with id to newUsername
     * returns {id, username}
     * throws error if id not found
    */

   static async changeUsername(id, newUsername)

    /** Updates the username of user with id to newUsername
     * returns undefined
     * throws error if id not found
    */

    static async changePassword(id, newPassword)

    /** removes user from database
     * returns { id, username, picture_url }
     */

    static async remove(id)
}

module.exports = User