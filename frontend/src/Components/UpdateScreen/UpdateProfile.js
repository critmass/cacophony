import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "reactstrap";
import { loginUserByToken } from "../../Actions/userActionMaker";
import useChangeHandler from "../../hooks/useChangeHandler";
import InputGroupBundle from "../InputGroupBundle/InputGroupBundle";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const UpdateProfile = ({pullProfile, pushProfile}) => {
    const {userId} = useParams()
    const currUser = useSelector(state => state.user)
    const [flags, setFlags] = useState({
        isLoading:true,
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
            const updatedUser = await pushProfile(inputs)
            if(currUser.id === updatedUser.id) {
                dispatch(loginUserByToken())
            }
            setFlags({
                isLoading: false,
                error: false,
                success: true
            })
        } catch (err) {
            setFlags({
                isLoading: false,
                error: true,
                success: false
            })
        }
    }
    useEffect(() => {
        const getUserToUpdate = async () => {
            setFlags({
                isLoading: true,
                error: false,
                success: false
            })

            const user = await pullProfile()
            setInputs({...user, pictureUrl:user.picture_url})
            setFlags(state => ({...state, isLoading:false}))
        }
        getUserToUpdate()
    }, [userId])

    if(flags.isLoading) return <LoadingScreen/>

    return (<div>
        <div className="row">
            {flags.success ?
                (<span className="">
                    Successfully updated
                </span>):
                flags.error ?
                    (<span className="">
                        There was an error
                    </span>):
                    <></>
            }
        </div>
        <div className="row">
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
            <Button onClick={handleSubmit}>
                UPDATE
            </Button>
        </div>
    </div>)
}

export default UpdateProfile