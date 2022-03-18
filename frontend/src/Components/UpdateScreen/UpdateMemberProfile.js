import React from "react";
import { useHistory, useParams } from "react-router";
import { Button } from "reactstrap";
import CacophonyApi from "../../helpers/CacophonyAPI";
import UpdateProfile from "./UpdateProfile";

const UpdateMembershipProfile = () => {
    const {memberId, serverId} = useParams()
    const history = useHistory()

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
            {...inputs, nickname:inputs.name}
        )
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
        <UpdateProfile pullProfile={pullProfile} pushProfile={pushProfile}/>
        <Button onClick={handleRemove}>
            Leave Server
        </Button>
    </div>)
}

export default UpdateMembershipProfile