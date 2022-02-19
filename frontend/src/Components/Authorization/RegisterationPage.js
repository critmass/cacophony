import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getTokenFromRegistration } from "../../Actions/tokenActionMaker";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";

const RegistrationPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [inputs, setInputs] = useState({
        username:"", password:"", pictureUrl:""
    })

    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = () => {
        const {username, password, pictureUrl} = inputs
        dispatch(getTokenFromRegistration(username, password, pictureUrl))
        history.push("/")
    }
    return (<div>
        <InputGroupBundle
            name={"username"}
            value={inputs.username}
            onChange={handleChange}
            label={"USERNAME"}
        />
        <InputGroupBundle
            name={"password"}
            value={inputs.password}
            onChange={handleChange}
            label={"PASSWORD"}
            type="password"
        />
        <InputGroupBundle
            name={"pictureUrl"}
            value={inputs.pictureUrl}
            onChange={handleChange}
            label={"PICTURE URL"}
        />
        <Button onClick={handleSubmit}>
            Submit
        </Button>
    </div>)
}

export default RegistrationPage