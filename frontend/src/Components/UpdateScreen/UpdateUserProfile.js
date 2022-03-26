import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateUser } from "../../Actions/userActionMaker";
import CacophonyApi from "../../helpers/CacophonyAPI";
import UpdateProfile from "./UpdateProfile";
import "./UpdateUserProfile.css"

const UpdateUserProfile = () => {
    const { userId } = useParams()
    const currUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    const pushProfile = async inputs => {
        let user = {}
        if(Number(currUser)===Number(userId)) {
            dispatch(updateUser(inputs, userId))

        }
        else {
            user = await CacophonyApi.updateUser(
                userId,
                { ...inputs, username: inputs.name }
            )
        }
        return {
            ...user,
            username: user.name
        }
    }
    const pullProfile = async () => {
        const user = await CacophonyApi.getUser(userId)
        return {
            ...user,
            name: user.username
        }

    }
    return (<div className="UpdateUserProfile">
        <h1 className="display-2 UpdateUserProfile-title">
            Update User Profile
        </h1>
        <UpdateProfile
            pushProfile={pushProfile}
            pullProfile={pullProfile}
        />
    </div>)
}

export default UpdateUserProfile