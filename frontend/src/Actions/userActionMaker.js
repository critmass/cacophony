import { CLEAR_USER, GET_USER, UPDATE_USER } from "./actionList"
import CacophonyApi from "../helpers/CacophonyAPI"
import { gotMemberships } from "./membershipActionMaker"


const gotUser = user => {
    return {type:GET_USER, user}
}

const extractUserInfo = user => {
    const userData = {
        id: user.id,
        username: user.username,
        pictureUrl: user.picture_url,
        joiningDate: user.joining_date
    }
    return userData
}

const getUser = userId => {
    const getUserFromAPI = async dispatch => {
        const user = await CacophonyApi.getUser(userId)
        const memberships = user.memberships
        dispatch(gotMemberships(memberships))
        const userData = extractUserInfo(user)
        dispatch(gotUser(userData))
    }
    return getUserFromAPI
}

const updatedUser = updates => {
    return {type:UPDATE_USER, updates}
}

const updateUser = (updates, userId) => {
    const updateUserWithApi = async dispatch => {
        const {user} = await CacophonyApi.updateUser(userId, updates)
        const userData = extractUserInfo(user)
        dispatch(updatedUser(userData))
    }
    return updateUserWithApi
}

const clearUser = () => {
    return {type:CLEAR_USER}
}

export {getUser, clearUser, updateUser}