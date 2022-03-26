import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { registerUser } from "../../Actions/userActionMaker";
import { ACCEPTABLE_IMAGE_URLS } from "../../defaultSettings";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";
import './RegisterationPage.css'

const RegistrationPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [inputs, setInputs] = useState({
        username:"", password:"", pictureUrl:""
    })
    const [flags, setFlags] = useState({error:false, invalidUrl:false})

    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = () => {
        try {
            if(
                ACCEPTABLE_IMAGE_URLS.includes(
                    inputs.pictureUrl.slice(
                        inputs.pictureUrl.length-4
                    ))
            ){
                const {username, password, pictureUrl} = inputs
                dispatch(registerUser(username, password, pictureUrl))
                history.push("/")
            }
            else {
                setFlags(state => ({error:false, invalidUrl:true}))
            }

        } catch (error) {
            setFlags(state => ({invalidUrl:false, error:true}))
        }
    }
    return (<div className="RegistrationPage">
        <h1 className="RegistrationPage-title display-4">
            Sign Up for Cacophony
        </h1>
        <div className="RegisterationPage-flags">
            {
                flags.error ?
                    (<span className="RegistrationPage-flags-error">
                        There was an error
                    </span>):<></>
            }
            {
                flags.invalidUrl ?
                    (<span className="RegistrationPage-flags-invalidUrl">
                        invalid picture url
                    </span>):<></>
            }
        </div>
        <div className="RegistrationPage-form">
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
        </div>
    </div>)
}

export default RegistrationPage