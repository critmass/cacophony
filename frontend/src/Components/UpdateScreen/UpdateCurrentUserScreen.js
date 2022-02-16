import React, { useState } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../actions/userActionMaker";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";

const UpdateCurrentUserScreen = () => {
    const userData = useSelector(state => state.user)
    const [inputs, setInputs] = useState({...userData})
    const handleChange = useChangeHandler(setInputs)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(updateUser(inputs))
        return <Redirect to="/"/>
    }

    return (
        <div>
            <h1 className="display-1">
                UPDATING YOUR USER INFORMATION
            </h1>
            <h2 className="h4">
                #{userData.id}
            </h2>
            <InputGroupBundle
                name={username}
                value={inputs.username}
                label="USERNAME"
                onChange={handleChange}
            />
            <InputGroupBundle
                name={picture_url}
                value={inputs.picture_url}
                label="PICTURE URL"
                onChange={handleChange}
            />
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    )
}

export default UpdateCurrentUserScreen