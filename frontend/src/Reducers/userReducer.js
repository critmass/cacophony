import {GET_USER, CLEAR_USER, UPDATE_USER} from "../Actions/actionList"

const INITIAL_STATE = {}

const user = (state={...INITIAL_STATE}, action) => {
    switch (action.type) {
        case GET_USER:
            return {...action.user}
        case CLEAR_USER:
            return INITIAL_STATE
        case UPDATE_USER:
            return {...state, ...action.updates}
        default:
            state
    }
}

export default user