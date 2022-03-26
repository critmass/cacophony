import axios from "axios"


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class CacophonyApi {

    static token;


    static async request(endpoint, data = {}, method = "get") {

        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${this.token}` };
        const params = (method === "get") ? data : {};

        try {
            const resp = await axios({
                url,
                method,
                data,
                params,
                headers
            })
            return resp.data
        }
        catch (err) {

            console.error("API Error:", err.response);

            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getServers () {
        const data = await this.request('servers')
        return data.servers
    }

    static async getServer(serverId) {
        const data = await this.request(`servers/${serverId}`)
        return data.server
    }

    static async addServer(server) {
        const data = await this.request("servers", server, "post")
        return data.server
    }

    static async updateServer(serverId, updates) {
        const data = await this.request(
            `servers/${serverId}`, updates, "patch"
        )
        return data.server
    }

    static async removeServer(serverId) {
        const data = await this.request(`servers/${serverId}`, {}, "delete")
        if(data.server.name) return true
        else return false
    }

    static async getUsers() {
        const data = await this.request(`users`)
        return data.users
    }

    static async getUser(userId) {
        const data = await this.request(`users/${userId}`)
        return data.user
    }

    static async updateUser(userId, updates) {
        const data = await this.request(
            `users/${userId}`, updates, "patch")
        return data.user
    }

    static async getRoles(serverId) {
        const data = await this.request(`servers/${serverId}/roles`)

        const roles = new Map()
        data.roles.forEach( role => {
            roles.set(role.id, role)
        })
        return roles
    }

    static async updateRole(serverId, roleId, updates) {
        const data = await this.request(
            `servers/${serverId}/roles/${roleId}`, updates, "patch")
        return data.roles
    }

    static async addRole(serverId, roleData) {
        const data = await this.request(
            `servers/${serverId}/roles`, roleData, 'post')
        return data.role
    }

    static async removeRole(serverId, roleId) {
        const data = await this.request(
            `servers/${serverId}/roles/${roleId}`, {}, 'delete')
        return data.role
    }

    static async updateMembership(memberId, serverId, updates) {

        const data = await this.request(
            `servers/${serverId}/members/${memberId}`,
            updates,
            'patch'
        )
        return data.membership
    }

    static async addMembership(
        serverId,
        roleId,
        userId,
        nickname,
        pictureUrl
    ) {
        const data = await this.request(
            `servers/${serverId}/members`,
            {roleId, userId, nickname, pictureUrl},
            "post"
        )
        return data.membership
    }

    static async removerMembership(member_id, server_id) {

        const data = await this.request(
            `servers/${server_id}/members/${member_id}`, {}, "delete")
        if(data.membership) return true
        else return false
    }

    static async getMembership(member_id, server_id) {

        const data = await this.request(
            `servers/${server_id}/members/${member_id}`, {}, "get")
        return data.membership
    }

    static async getRoom(serverId, roomId) {
        const data = await this.request(
            `servers/${serverId}/rooms/${roomId}`, {}, 'get')
        return data.room
    }

    static async addRoom(serverId, roomData) {
        await this.request(`servers/${serverId}/rooms`, roomData, "post")
    }

    static async removeRoom(serverId, roomId) {
        await this.request(
            `servers/${serverId}/rooms/${roomId}`,
            {},
            "delete"
        )
    }

    static async postToRoom(serverId, roomId, post) {
        await this.request(
            `servers/${serverId}/rooms/${roomId}/posts`, post, "post")

    }

    static async login(username, password) {
        const response = await this.request(
            `auth/token`, {username, password}, 'post')
        this.token = response.token
        return {token:this.token, user_id:response.user_id}
    }

    static async updateToken() {
        const resp = await this.request(`auth/update`,{}, "get")
        this.token = resp.token
        return this.token
    }

    static async register(username, password, pictureUrl) {
        const resp = await this.request(
            `auth/register`, {username, password, pictureUrl}, "post")
        console.log(resp)
        this.token = resp.token
        return {token:this.token, user_id:resp.user_id}
    }
}

export default CacophonyApi