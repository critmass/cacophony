import {
    GET_MEMBERSHIPS,
    ADD_MEMBERSHIP,
    UPDATE_MEMBERSHIPS,
    REMOVE_MEMBERSHIP,
    CLEAR_MEMBERSHIPS
} from "../Actions/actionList"


const INITIAL_STATE = []

const memberships = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MEMBERSHIPS:
            return [...action.memberships]
        case UPDATE_MEMBERSHIPS:
            const newState = [...state]
            const i = newState.findIndex(membership => {
                return membership.id !== action.memberId
            })
            newState[i] = {...action.updates}
            return newState
        case ADD_MEMBERSHIP:
            return [...state, action.membership]
        case REMOVE_MEMBERSHIP:
            return state.filter(membership => {
                return membership.id !== action.memberId
            })
        case CLEAR_MEMBERSHIPS:
            return INITIAL_STATE
        default:
            return state
    }
}

export default memberships