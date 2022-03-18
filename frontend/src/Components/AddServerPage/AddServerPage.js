import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { addServer } from "../../Actions/serverActionMaker";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";

const AddServerPage = () => {
    const [inputs, setInputs] = useState({
        name:"",
        pictureUrl:""
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = async () => {
        dispatch(addServer(inputs))
        history.push("/")
    }
    return (<div>
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
        <Button onClick={handleSubmit}>
            SUBMIT
        </Button>
    </div>)
}

export default AddServerPage