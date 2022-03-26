import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { loginUser } from "../../Actions/userActionMaker";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";
import "./LoginPage.css"

const LoginPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [inputs, setInputs] = useState({
        username:"", password:""
    })
    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = () => {
        const {username, password} = inputs
        dispatch(loginUser(username, password))
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