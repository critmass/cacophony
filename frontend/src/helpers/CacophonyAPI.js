import axios from "axios"
import { useSelector } from "react-redux";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class CacophonyApi {

    static token;
    static serverWebSocket;

    static async request(endpoint, data = {}, method = "get") {

        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${this.token}` };
        const params = (method === "get") ? data : {};

        try {
            const {data} = await axios({ url, method, data, params, headers })
            return data
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
        return data
    }

    static async updateServer(serverId, updates) {
        const data = await this.request(
            `servers/${serverId}`, updates, "patch"
        )
        return data.server
    }

    static async removeServer(serverId) {
        const data = await this.request(`servers/${serverId}`, {}, "delete")
        if(data.server) return true
        else return false
    }

    static async getUser(userId) {
        const data = await this.request(`users/${userId}`)
        return data.user
    }

    static async updateUser(userId, updates) {
        const data = await this.request(
            `users/${userId}`, updates, "post")
        return data.user
    }

    static async getRoles(serverId) {
        const data = await this.request(`servers/${serverId}/roles`)
        const roles = data.roles.reduce( (roleMap, role) => {
            roleMap.set(role.id, role)
        }, new Map())
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

    }

    static async updateMembership(memberId, updates) {
        const {serverId} = useSelector(state => {
            return state.memberships.find( membership => {
                return membership.id === memberId
            })
        })
        const data = await this.request(
            `servers/${serverId}/memberships/${memberId}`, updates, 'patch'
        )
        return data.membership
    }

    static async addMembership(
        serverId,
        roleId,
        userId,
        nickname,
        picture_url
    ) {
        const data = await this.request(
            `servers/${serverId}/members`,
            {roleId, userId, nickname, picture_url},
            "post"
        )
        return data.membership
    }

    static async removerMembership(member_id) {
        const memberships = useSelector(state => state.memberships)
        const {server_id} = memberships[member_id]
        const data = await this.request(
            `servers/${server_id}/memberships/${member_id}`, {}, "delete")
        if(data.membership) return true
        else return false
    }

    static async getMembership(memberId) {
        const memberships = useSelector(state => state.memberships)
        const { server_id } = memberships[memberId]
        const data = await this.request(
            `servers/${server_id}/memberships/${memberId}`, {}, "get")
        return data.membership
    }

    static async getRoom(serverId, roomId) {
        const data = await this.request(
            `servers/${serverId}/rooms/${roomId}`, {}, 'get')
    }

    static async postToRoom(serverId, roomId, post) {
        const user = useSelector(state => state.user)

    }

    static async login(username, password) {
        const response = await this.request(`auth/token`, {username, password}, 'post')
        this.token = response.token
        return this.token
    }
}

export default CacophonyApi