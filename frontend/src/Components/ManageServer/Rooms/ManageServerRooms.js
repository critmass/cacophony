import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "reactstrap";
import CacophonyApi from "../../../helpers/CacophonyAPI";
import useChangeHandler from "../../../hooks/useChangeHandler";
import InputGroupBundle from "../../InputGroupBundle/InputGroupBundle";
import "./ManageServerRooms.css"
import ManageServerRoomEntry from "./ManageServerRoomEntry";
import { getServer } from "../../../Actions/serverActionMaker";

const ManagerServerRooms = () => {
    const {serverId} = useParams()
    const {server, token} = useSelector(state => state)
    const {rooms} = server
    const dispatch = useDispatch()
    const defaultInputs = {
        name: ""
    }
    const [inputs, setInputs] = useState({...defaultInputs})
    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = async () => {
        await CacophonyApi.addRoom(serverId, inputs)
        dispatch(getServer(serverId))
        setInputs({...defaultInputs})
    }

    const handleEnter = e => {
        if(e.keyCode === 13) handleSubmit()
    }

    const addRoomButton = () => {
        return (<Button onClick={handleSubmit}>
                ADD
            </Button>)
    }

    return (<div className="ManageServerRooms">
        <h1 className="display-4 ManageServerRooms-title">
            Manage Rooms
        </h1>
        <div className="ManageServerRooms-form">
            <InputGroupBundle
                name={"name"}
                value={inputs.name}
                onChange={handleChange}
                label={addRoomButton()}
                onKeyDown={handleEnter}
                type={"text"}
            />
        </div>
        <ul className="ManageServerRooms-ul">
            {rooms.map(room => {
                console.log(room)
                return (<li
                    key={`room-${room.id}`}
                    className="ManageServerRooms-li"
                >
                    <ManageServerRoomEntry room={room}/>
                </li>)
            })}
        </ul>
    </div>)
}

export default ManagerServerRooms