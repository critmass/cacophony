import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getServer } from "../../../Actions/serverActionMaker";
import CacophonyApi from "../../../helpers/CacophonyAPI";
import { Trash3 } from "react-bootstrap-icons"

const ManageServerRoomEntry = ({room}) => {
    const {serverId} = useParams()
    const dispatch = useDispatch()

    const handleClick = async () => {
        try {
            await CacophonyApi.removeRoom(serverId, room.id)
            dispatch(getServer(serverId))
        } catch (err) {

        }
    }

    return (<span className="ManageServerRoomEntry">
        <Trash3
            onClick={handleClick}
            className="ManageServerRoomEntry-trash"
        /> {room.name}
    </span>)
}

export default ManageServerRoomEntry