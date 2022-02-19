import CacophonyApi from "../helpers/CacophonyAPI"
import {
    ADD_SERVER,
    CLEAR_SERVERS,
    GET_SERVERS,
    REMOVE_SERVER
} from "./actionList"
import { addedMembership } from "./membershipActionMaker"
import { getUser } from "./userActionMaker"

const gotServers = servers => {
    return {type:GET_SERVERS, servers}
}

const getServers = () => {
    const getServersFromApi = async dispatch => {
        const servers = await CacophonyApi.getServers()
        dispatch(gotServers(servers))
    }
    return getServersFromApi
}

const clearServers = () => {
    return {type:CLEAR_SERVERS}
}

const addedServer = server => {
    return {type:ADD_SERVER, server}
}

const addServer = (serverName, pictureUrl = null) => {
    const addServerToApi = async dispatch => {
        const {membership, server} = await CacophonyApi.addServer(
                                                    {serverName, pictureUrl})
        dispatch(addedServer(server))
        dispatch(addedMembership(membership))
    }
    return addServerToApi
}

const removedServer = serverId => {
    return {type:REMOVE_SERVER, serverId}
}

const removeServer = (serverId) => {
    const removeServerFromApi = async dispatch => {
        const success = await CacophonyApi.removeServer(serverId)
        if(success) {
            dispatch(removedServer(serverId))
            dispatch(getUser())
        }
    }
    return removeServerFromApi
}

export {
    getServers,
    clearServers,
    addServer,
    removeServer
}