import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Button } from "reactstrap";
import { getServer } from "../../Actions/serverActionMaker";
import CacophonyApi from "../../helpers/CacophonyAPI";
import UpdateProfile from "./UpdateProfile";
import "./UpdateMemberProfile.css"

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
        const membership = await CacophonyApi.updateMembership(
            memberId,
            serverId,
            {...inputs, nickname:inputs.name}
        )
        dispatch(getServer(serverId))
        return {
            pictureUrl: membership.picture_url,
            nickname: membership.name
        }
    }
    const pullProfile = async () => {
        const membership = await CacophonyApi.getMembership(
            memberId,
            serverId
        )

        return {
            picture_url: membership.picture_url,
            name: membership.nickname
        }

    }
    return (<div className="UpdateMemberProfile">
        <h1 className="display-4 UpdateMemberProfile-title">
            Update Membership
        </h1>
        <div className="UpdateMemberProfile-form">

            <UpdateProfile
                pullProfile={pullProfile}
                pushProfile={pushProfile}
            />
            <Button
                onClick={handleRemove}
                className="UpdateMemberProfile-btn"
            >
                Leave Server
            </Button>
        </div>
    </div>)
}

export default UpdateMembershipProfile