import CacophonyApi from "../helpers/CacophonyAPI"
import { CLEAR_TOKEN, GET_TOKEN } from "./actionList"

const gotToken = token => {
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

const clearToken = () => {
    return {type:CLEAR_TOKEN}
}

export {getToken, clearToken, getTokenFromRegistration}