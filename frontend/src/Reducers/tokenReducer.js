import { CLEAR_TOKEN, GET_TOKEN } from "../Actions/actionList"

const INITIAL_STATE = ""

const token = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return action.token
        case CLEAR_TOKEN:
            return INITIAL_STATE
        default:
            return state
    }
}

export default token