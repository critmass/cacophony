/** Functionality for chatrooms */

// Room is an abstraction of the chat channel
const Room = require("./Room")


/** RoomMember is used to connect a room to an individual user */

class RoomMember {

    /** makes a connection between the member and the room
     * stores: memberId, room, and the websocket connection
     */

    async constructor (send, memberId, roomId) {
        try {
            this.room = Room.get(roomId)
            this._send = send
            this.memberId = memberId
        }
        catch(err) {

        }
    }

    async send(data) {
        try {

        } catch (err) {

        }
    }
}