import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import ServerPageContext from "../../Context/ServerPageContext";
import CacophonyApi from "../../helpers/CacophonyAPI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ServerFrame from "../Frames/ServerFrame";
import addLinks from "../../helpers/addLinks";

const ServerPage = ({children}) => {
    const {serverId} = useParams()
    const [serverInfo, setServerInfo] = useState({})
    const [rooms, setRooms] = useState([])
    const [members, setMembers] = useState([])
    const [roles, setRoles] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getServerInfo = async () => {
            setIsLoading(true)
            const server = await CacophonyApi.getServer(serverId)
            const gotRoles = await CacophonyApi.getRoles(serverId)
            setServerInfo({
                name:server.name,
                id:server.id,
                pictureUrl:server.picture_url,
                startDate:server.start_date
            })
            const roomsWithLinks = addLinks(server.rooms)
            const membersWithLinks = addLinks(server.members)
            const rolesWithLinks = addLinks(gotRoles)
            setRooms(roomsWithLinks)
            setMembers(membersWithLinks)
            setRoles(rolesWithLinks)
        }
        getServerInfo()
        setIsLoading(false)
    }, [])

    if(isLoading) {
        return <LoadingScreen/>
    }

    return (
        <ServerPageContext.Provider value={
            serverInfo, rooms, members, roles,
            setServerInfo, setRooms, setRoles, setMembers, setIsLoading
        }>
            <ServerFrame>
                {children}
            </ServerFrame>
        </ServerPageContext.Provider>
    )
}

export default ServerPage