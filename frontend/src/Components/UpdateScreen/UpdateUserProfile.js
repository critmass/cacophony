import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateUser } from "../../Actions/userActionMaker";
import CacophonyApi from "../../helpers/CacophonyAPI";
import UpdateProfile from "./UpdateProfile";

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
            pictureUrl: user.picture_url,
            username: user.name
        }
    }
    const pullProfile = async () => {
        const user = await CacophonyApi.getUser(userId)
        return {
            pictureUrl: user.picture_url,
            name: user.username
        }

    }
    return (<UpdateProfile
        pushProfile={pushProfile}
        pullProfile={pullProfile}
    />)
}

export default UpdateUserProfile