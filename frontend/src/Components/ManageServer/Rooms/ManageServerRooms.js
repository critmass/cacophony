import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "reactstrap";
import { loginUserByToken } from "../../../Actions/userActionMaker";
import CacophonyApi from "../../../helpers/CacophonyAPI";
import useChangeHandler from "../../../hooks/useChangeHandler";
import InputGroupBundle from "../../InputGroupBundle/InputGroupBundle";
// import LoadingScreen from "../../LoadingScreen/LoadingScreen";

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
        dispatch(loginUserByToken(token))
        setInputs({...defaultInputs})
    }
    const handleClickRemove = async e => {
        const roomId = e.target.roomId
        await CacophonyApi.removeRoom(serverId, roomId)
    }

    // if(isLoading) return <LoadingScreen/>

    const addRoomButton = () => {
        return (<Button onClick={handleSubmit}>
                ADD
            </Button>)
    }

    return (<div className="row">
        <div className="col">
            <InputGroupBundle
                name={"name"}
                value={inputs.name}
                onChange={handleChange}
                label={addRoomButton()}
                type={"text"}
            />
            <ul>
                {rooms.map(room => {
                    return (<li>
                        <span onClick={handleClickRemove}>X</span>
                        <span>{room.name}</span>
                    </li>)
                })}
            </ul>
        </div>
    </div>)
}

export default ManagerServerRooms