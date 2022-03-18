import CacophonyApi from "../helpers/CacophonyAPI"
import { CLEAR_TOKEN, GET_TOKEN } from "./actionList"
import { loginUser } from "./userActionMaker"

const gotToken = token => {
    localStorage.setItem("jwToken", token)
    console.log(localStorage)
    return {type:GET_TOKEN, token}
}

const getToken = (username, password) => {
    const getTokenFromApi = async dispatch => {
        const token = await CacophonyApi.login(username, password)
        dispatch(gotToken(token))
    }
    return getTokenFromApi
}

const getTokenFromRegistration = (username, password, picture_url) => {
    const getTokenFromApi = async dispatch => {
        const token = await CacophonyApi.register(
            username, password, picture_url)
        dispatch(gotToken(token))
    }
    return getTokenFromApi
}

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("jwToken")
    CacophonyApi.token = token
    return gotToken(token)
}

const getUpdatedToken = () => {
    const getUpdatedTokenFromApi = async dispatch => {
        const token = await CacophonyApi.updateToken()
        dispatch(gotToken(token))
    }
    return getUpdatedTokenFromApi
}

const clearToken = () => {
    CacophonyApi.token = null
    localStorage.setItem("jwToken", "")
    return {type:CLEAR_TOKEN}
}

export {
    getToken,
    clearToken,
    getTokenFromRegistration,
    gotToken,
    getTokenFromLocalStorage,
    getUpdatedToken
}