"use strict";

const db = require("../db")

/** Related functions for Server */

class Server {

    /** Creates a room (from data), update db, return new server info
     * data should be {serverName, picture_url}
     * returns {id, name, picture_url}
     */

    static async create(serverName, picture_url=null);

    /** Finds all servers
     * returns [{id, name, picture_url, number_of_members}, ...]
     */

    static async findAll();

    /** Finds all servers with serverName
     * return [{id, name, picture_url, number_of_members}, ...]
     * returns Server.findAll() if null is pasted in
     * throws error if no servers found
    */

    static async find(serverName=null);

    /** Gets server by id
     * returns {
     *              id,
     *              name,
     *              picture_url,
     *              rooms:[{id, name, type}, ...],
     *              roles:[{id, title, is_admin}, ...],
     *              members:[{id, user_id, nickname, picture_url}, ...]
     *          }
     */

    static async get(id);

    /** Updates a name of server
     * data required {id, newName}
     * returns {id, name, picture_url}
     */

    static async updateName(id, newName);

    /** Updates a picture url of server
     * data required {id, newPictureUrl}
     * returns {id, name, picture_url}
     */

    static async updatePictureUrl(id, newPictureUrl);

    /** Removes server with id from database
     * returns {id, name, picture_url}
     */

    static async delete(id);
}

module.exports = Server