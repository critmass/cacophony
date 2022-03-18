import { CLEAR_USER, GET_USER, UPDATE_USER } from "./actionList"
import CacophonyApi from "../helpers/CacophonyAPI"
import { gotMemberships } from "./membershipActionMaker"
import { gotToken } from "./tokenActionMaker"
import {v4 as uuid} from "uuid"
import jwt from "jsonwebtoken"

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

const loginUser = (username, password) => {
    const loginUserFromApi = async dispatch => {
        const {token, user_id} = await CacophonyApi.login(username, password)
        const user = await CacophonyApi.getUser(user_id)
        localStorage.setItem("userId", user_id)
        const memberships = user.memberships
        const userInfo = extractUserInfo(user)
        dispatch(gotToken(token))
        dispatch(gotMemberships(memberships.map(membership => {
            return {...membership, key:uuid()}
        })))
        dispatch(gotUser(userInfo))
    }
    return loginUserFromApi
}

const loginUserByToken = token => {
    const loginUserByTokenFromApi = async dispatch => {
        const {id} = jwt.decode(token)
        console.log(id)
        const user = await CacophonyApi.getUser(id)
        const userData = extractUserInfo(user)
        dispatch(gotUser(userData))
        dispatch(gotMemberships(user.memberships))
    }
    return loginUserByTokenFromApi
}

const registerUser = (
    username, password, picture_url) => {
    const registerUserFromApi = async dispatch => {
        const resp = await CacophonyApi.register(
            username, password, picture_url)
        const {token, user_id} = resp
        const user = await CacophonyApi.getUser(user_id)
        const memberships = user.memberships
        const userInfo = extractUserInfo(user)
        dispatch(gotToken(token))
        dispatch(gotMemberships(memberships))
        dispatch(gotUser(userInfo))
    }
    return registerUserFromApi
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

export {
    getUser,
    clearUser,
    updateUser,
    loginUser,
    registerUser,
    loginUserByToken
}