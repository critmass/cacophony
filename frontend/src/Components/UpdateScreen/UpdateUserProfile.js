import React from "react";
import { useParams } from "react-router";
import CacophonyApi from "../../helpers/CacophonyAPI";
import UpdateProfile from "./UpdateProfile";

const UpdateUserProfile = () => {
    const {userId} = useParams()

    const pushProfile = async inputs => {
        const user = await CacophonyApi.updateUser(
            userId,
            { ...inputs, username: inputs.name }
        )
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
    return <UpdateProfile pushProfile={pushProfile} pullProfile={pullProfile}/>
}

export default UpdateUserProfile