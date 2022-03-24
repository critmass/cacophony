import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Button } from "reactstrap";
import { getServer } from "../../Actions/serverActionMaker";
import CacophonyApi from "../../helpers/CacophonyAPI";
import UpdateProfile from "./UpdateProfile";

const UpdateMembershipProfile = () => {
    const {memberId, serverId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleRemove = async () => {
        try {
            await CacophonyApi.removerMembership(memberId, serverId)
            history.push("/")
        } catch (error) {

        }
    }

    const pushProfile = async inputs => {
        const user = await CacophonyApi.updateMembership(
            memberId,
            serverId,
            {...inputs, nickname:inputs.name}
        )
        dispatch(getServer(serverId))
        return {
            pictureUrl: user.picture_url,
            nickname: user.name
        }
    }
    const pullProfile = async () => {
        const user = await CacophonyApi.getMembership(memberId, serverId)
        return {
            pictureUrl: user.picture_url,
            name: user.nickname
        }

    }
    return (<div>
        <UpdateProfile
            pullProfile={pullProfile}
            pushProfile={pushProfile}
        />
        <Button onClick={handleRemove}>
            Leave Server
        </Button>
    </div>)
}

export default UpdateMembershipProfile