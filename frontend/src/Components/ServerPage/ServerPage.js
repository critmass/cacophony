import React, { useEffect, useState } from "react";
import {useParams, Redirect} from "react-router-dom"
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ServerFrame from "../Frames/ServerFrame";
import { useDispatch } from "react-redux";
import { clearServer, getServer } from "../../Actions/serverActionMaker";

const ServerPage = ({children}) => {

    const [isLoading, setIsLoading] = useState(true)
    const {serverId} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        const getServerInfo = async () => {
            setIsLoading(true)
            await dispatch(getServer(serverId))
            setIsLoading(false)
        }
        getServerInfo()
        return () => {
            dispatch(clearServer())
        }
    }, [serverId])

    if(isLoading) {
        return (<LoadingScreen/>)
    }

    return (
        <ServerFrame>
            {children}
        </ServerFrame>
    )
}

export default ServerPage