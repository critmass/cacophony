import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getToken } from "../../Actions/tokenActionMaker";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";

const LoginPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [inputs, setInputs] = useState({
        username:"", password:""
    })
    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = () => {
        dispatch(getToken(inputs.username, inputs.password))
        history.push("/")
    }
    return (<div>
        <InputGroupBundle
            name={'username'}
            value={inputs.username}
            onChange={handleChange}
            label={'USERNAME'}
            type="text"
        />
        <InputGroupBundle
            name="password"
            value={inputs.password}
            onChange={handleChange}
            label="PASSWORD"
            type="password"
        />
        <Button onClick={handleSubmit}>
            Login
        </Button>
    </div>)
}

export default LoginPage