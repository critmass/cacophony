import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ServerPageContext from "../../Context/ServerPageContext";
import CacophonyApi from "../../helpers/CacophonyAPI";

const RoomScreen = () => {
    const {serverId, roomId} = useParams()
    const [lines, setLines] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getContent = async () => {
            const content = await CacophonyApi
        }
        getContent()
    }, [lines])
}

export default RoomScreen