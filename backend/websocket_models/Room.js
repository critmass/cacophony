/** Chat rooms that can be joined/left/broadcast to. */

const DatabaseRoom = require("../database_models/Room")

// in-memory storage of roomId -> room

const ROOMS = new Map();

/** Room is a collection of listening members; this becomes a "chat room"
 * where individual users can join/leave/broadcast to.  When the first
 * member joins a room it is added to the ROOMS map.  When the last member
 * of a room leaves it is removed from the ROOMS map.
 */

class Room {

    /** get room by id, if the room is not in memory, pulls it from the
     * database and adds it to the Map. If the room is not in the database
     * it will throw an error. Use this method only for websocket calls,
     * so that a member can be added immediately.  This is because members
     * joining and leaving is used for garbage collection purposes.  If you
     * need information about a room, use a the database_model calls or
     * http routes.
     */

    static async get (roomId) {
        if(!ROOMS.has(roomId)) {
            ROOMS.set(roomId, new Room(roomId))
        }

        return ROOMS.get(roomId)
    }

    /** creates a new instance of the Room object with a map of accepted
     * members by id.  If the roomId isn't in the database it throws an
     * error.
     * */

    async constructor (roomId) {

        const roomData = await DatabaseRoom.get(roomId)

        this.posts = roomData.posts
        this.id = roomData.id
        this.name = roomData.name
        this.type = roomData.type
        this.members = roomData.members
        this.members.forEach( member => {
            member.online = false
        });
    }

    /** member joining a room, if not on the accepted member
     * list throws an error.  If they are on the accepted member
     * list, changes the member status from offline to online.
     * */

    async join(member_id) {}

    /** member status changed from online to offline.  If the last member
     * leaves it deletes the room from ROOMS.
     */

    async leave(member_id) {}

    /** sends the new post to everyone currently logged-in to the room. */

    async broadcast(post) {}

}

module.exports = Room