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
    const [flags, setFlags] = useState({
        error:false
    })
    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = () => {
        try {
            const {username, password} = inputs
            dispatch(loginUser(username, password))
            history.push("/")
        } catch (err) {
            setFlags({error:true})
        }
    }
    return (<div className="LoginPage">
        <h1 className="display-4 LoginPage-title">
            Login
        </h1>
        <div className="LoginPage-flags">
            {
                flags.error ?
                    (<span className="LoginPage-flags-error">
                        There was an error
                    </span>):<></>
            }
        </div>
        <div className="LoginPage-form">
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
        </div>
    </div>)
}

export default LoginPage