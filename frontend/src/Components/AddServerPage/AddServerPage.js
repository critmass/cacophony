import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { addServer } from "../../Actions/serverActionMaker";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";
import "./AddServerPage.css"

const DEFAULT_INPUTS = {name:"", pictureUrl:""}

const AddServerPage = () => {
    const [inputs, setInputs] = useState({...DEFAULT_INPUTS})
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const [flags, setFlags] = useState({
        error:false,
        success:false
    })
    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = async () => {
        try {
            dispatch(addServer(inputs))
            setFlags({success:true, error:false})
            setInputs({...DEFAULT_INPUTS})
        } catch (err) {
            setFlags({success:false, error:true})
        }
    }
    return (<div className="AddServerPage">
        <h1 className="display-1 AddServerPage-title">
            Add a New Server
        </h1>
        <div className="AddServerPage-flags">
            {
                flags.error ?
                    (<span className="AddServerPage-error">
                        There was an error.
                    </span>):
                    flags.success ?
                        <span className="AddServerPage-success">
                            Server created!
                        </span>:
                        <></>

            }
        </div>
        <div className="AddServerPage-form">
            <InputGroupBundle
                label={"NAME"}
                type={'text'}
                name={"name"}
                value={inputs.name}
                onChange={handleChange}
            />
            <InputGroupBundle
                label={"PICTURE URL"}
                type={'text'}
                name={"pictureUrl"}
                value={inputs.pictureUrl}
                onChange={handleChange}
            />
            <Button
                onClick={handleSubmit}
                className={"AddServerPage-form-button"}
            >
                SUBMIT
            </Button>
        </div>
    </div>)
}

export default AddServerPage