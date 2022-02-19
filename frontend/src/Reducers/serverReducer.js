import {
    ADD_SERVER,
    CLEAR_SERVERS,
    GET_SERVERS,
    REMOVE_SERVER,
    UPDATE_SERVER
} from "../Actions/actionList"

const INITIAL_STATE = []

const servers = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SERVERS:
            return [...action.servers]
        case CLEAR_SERVERS:
            return INITIAL_STATE
        case ADD_SERVER:
            return [...state, action.server]
        case UPDATE_SERVER:
            const newState = [...state]
            const i = newState.findIndex(server => {
                return server.id === action.serverId
            })
            newState[i] = {...newState[i], ...action.updates}
            return newState
        case REMOVE_SERVER:
            return state.filter(server => {
                return server.id !== action.serverId
            })
        default:
            return state
    }
}

export default servers