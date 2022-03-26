import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateServer } from "../../../Actions/serverActionMaker";
import { loginUserByToken } from "../../../Actions/userActionMaker";
import UpdateProfile from "../../UpdateScreen/UpdateProfile";
import "./ServerSettingsScreen.css"

const ServerSettingsScreen = () => {
    const {server, token} = useSelector(state => state)
    const dispatch = useDispatch()

    const pull = async () => {
        console.log(server)
        return {
            name:server.name,
            picture_url:server.pictureUrl
        }
    }

    const push = async inputs => {
        dispatch(updateServer(server.id, inputs))
        dispatch(loginUserByToken(token))
        return {
            name:server.name,
            picture_url:server.pictureUrl
        }
    }

    return (<div className="ServerSettingsScreen">
        <h1 className="display-4 ServerSettingsScreen-title">
            Update Server Settings
        </h1>
        <div className="ServerSettingsScreen-inputs">
            <UpdateProfile
                pullProfile={pull}
                pushProfile={push}
            />
        </div>
    </div>)
}

export default ServerSettingsScreen