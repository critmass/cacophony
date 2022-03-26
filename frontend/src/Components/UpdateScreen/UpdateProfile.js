import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "reactstrap";
import { loginUserByToken } from "../../Actions/userActionMaker";
import { ACCEPTABLE_IMAGE_URLS } from "../../defaultSettings";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./UpdateProfile.css"

const UpdateProfile = ({pullProfile, pushProfile}) => {
    const {userId} = useParams()
    const token = useSelector(state => state.token)
    const [flags, setFlags] = useState({
        isLoading:true,
        invalidPic:false,
        error:false,
        success:false
    })
    const [inputs, setInputs] = useState({
        name:"",
        pictureUrl:""
    })
    const dispatch = useDispatch()
    const handleChange = useChangeHandler(setInputs)
    const handleSubmit = async () => {
        try {
            setFlags(state => ({...state, isLoading:true}))
            if(
                ACCEPTABLE_IMAGE_URLS.includes(
                    inputs.pictureUrl.slice(
                        inputs.pictureUrl.length-4
                ))
            ) {
                const updatedUser = await pushProfile(inputs)
                dispatch(loginUserByToken(token))
                setFlags({
                    isLoading: false,
                    invalidPic: false,
                    error: false,
                    success: true
                })
            }
            else {
                setFlags(state => {
                    return {...state, invalidPic:true, isLoading:false}
                })
            }

        } catch (err) {
            setFlags(state => ({
                ...state,
                isLoading: false,
                error: true,
                success: false
            }))
        }
    }
    useEffect(() => {
        const getUserToUpdate = async () => {
            setFlags({
                isLoading: true,
                invalidPic: false,
                error: false,
                success: false
            })

            const user = await pullProfile()
            console.log(user)
            setInputs({...user, pictureUrl:user.picture_url})
            setFlags(state => ({...state, isLoading:false}))
        }
        getUserToUpdate()
    }, [userId])

    if(flags.isLoading) return (<LoadingScreen/>)

    return (<div className="UpdateProfile">
        <div className="row UpdateProfile-flags">
            {flags.success ?
                (<span className="UpdateProfile-flags-success">
                    Successfully updated
                </span>):
                flags.error ?
                    (<span className="UpdateProfile-flags-error">
                        There was an error
                    </span>):
                    <></>
            }
            {flags.invalidPic ?
                (<span className="UpdateProfile-flags-invalidPic">
                    That was an invalid picture url.
                </span>):<></>
            }
        </div>
        <div className="row UpdateProfile-inputs">
            <InputGroupBundle
                name={"name"}
                value={inputs.name}
                onChange={handleChange}
                label={"NAME"}
                type="text"
            />
            <InputGroupBundle
                name={"pictureUrl"}
                value={inputs.pictureUrl}
                onChange={handleChange}
                label={"PICTURE URL"}
                type="text"
            />
            <Button
                onClick={handleSubmit}
                className="UpdateProfile-btn"
            >
                UPDATE
            </Button>
        </div>
    </div>)
}

export default UpdateProfile