import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import CacophonyApi from "../../helpers/CacophonyAPI";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";

const ChatSubmissionLine = ({reload}) => {
    const {serverId, roomId} = useParams()
    const [inputs, setInputs] = useState({content:""})
    const handleChange = useChangeHandler(setInputs)

    const handleSubmit = () => {
        CacophonyApi.postToRoom(serverId, roomId, inputs)
        reload()
    }

    const submitButton = <Button onClick={handleSubmit}>Submit</Button>

    return (
        <InputGroupBundle
            name={"content"}
            value={inputs.content}
            onChange={handleChange}
            label={submitButton}
            type={"text"}
        />
    )
}

export default ChatSubmissionLine