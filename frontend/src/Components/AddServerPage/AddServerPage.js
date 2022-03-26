import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { addServer } from "../../Actions/serverActionMaker";
import { ACCEPTABLE_IMAGE_URLS } from "../../defaultSettings";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./AddServerPage.css"

const DEFAULT_INPUTS = {name:"", pictureUrl:""}

const AddServerPage = () => {
    const [inputs, setInputs] = useState({...DEFAULT_INPUTS})
    const dispatch = useDispatch()
    const [flags, setFlags] = useState({
        isLoading:false,
        error:false,
        invalidUrl:false,
        success:false
    })
    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = async () => {
        try {
            setFlags(state => ({...state, isLoading:true}))
            console.log("start")
            if(
                ACCEPTABLE_IMAGE_URLS.includes(
                    inputs.pictureUrl.slice(
                        inputs.pictureUrl.length - 4
                    )
                )
            ){
                console.log("valid url")
                dispatch(addServer(inputs))
                setFlags({
                    success:true,
                    error:false,
                    invalidUrl:false,
                    isLoading:false
                })
                setInputs({...DEFAULT_INPUTS})
            }
            else {
                setFlags(state => {
                    console.log(state)
                    console.log("invalid url")
                    return{
                        success:false,
                        error:false,
                        invalidUrl:true,
                        isLoading:false
                    }
                })
                console.log(flags)
            }
            console.log(flags)
            console.log("fin")
        } catch (err) {
            setFlags(state => ({
                ...state,
                success:false,
                error:true,
                isLoading:false
            }))
        }
    }

    if(flags.isLoading) (<LoadingScreen/>)

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
            {
                (flags.error || flags.success) && flags.invalidUrl ?
                    <br/>:<></>
            }
            {
                flags.invalidUrl ?
                    (<span className="AddServerPage-flags-invalidUrl">

                    </span>):<></>
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