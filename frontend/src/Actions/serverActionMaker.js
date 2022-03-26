import CacophonyApi from "../helpers/CacophonyAPI"
import {
    ADD_SERVER,
    CLEAR_SERVER,
    UPDATE_MEMBERS,
    UPDATE_ROLES,
    UPDATE_ROOMS,
    GET_SERVER,
    UPDATE_SERVER
} from "./actionList"
import { loginUserByToken } from "./userActionMaker"

const gotServer = (server) => {
    return {type:GET_SERVER, server}
}

const getServer = (serverId) => {
    const getServerFromApi = async dispatch => {
        const serverInfo = await CacophonyApi.getServer(serverId)
        dispatch(gotServer(serverInfo))
    }
    return getServerFromApi
}

const updatedServer = (updates) => {
    return {type:UPDATE_SERVER, updates}
}

const updateServer = (serverId, updates) => {
    const updateServerByApi = async dispatch => {
        const serverInfo = await CacophonyApi.updateServer(serverId, updates)
        dispatch(updatedServer(serverInfo))
    }
    return updateServerByApi
}

const addedServer = (server) => {
    return {type:ADD_SERVER, server}
}

const addServer = (serverData) => {
    const addServerToApi = async dispatch => {
        await CacophonyApi.addServer(serverData)
        const token = await CacophonyApi.updateToken()
        dispatch(loginUserByToken(token))

    }
    return addServerToApi
}

const updatedMembers = (members) => {
    return {UPDATE_MEMBERS, members}
}

const updatedRoles = (roles) => {
    return {UPDATE_ROLES, roles}
}

const updatedRooms = (rooms) => {
    return {UPDATE_ROOMS, rooms}
}

const clearServer = () => {
    return {type:CLEAR_SERVER}
}

export {getServer, updateServer, clearServer, addServer}