import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import ServerPageContext from "../../Context/ServerPageContext";
import CacophonyApi from "../../helpers/CacophonyAPI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ServerFrame from "../Frames/ServerFrame";
import { addLink } from "../../helpers/addLinks";
import ServerNavBar from "../NavBar/ServerNavbar";

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

            const baseLink = `/server/${server.id}/`

            const rolesWithLinks = {}
            const membersWithLinks = {}
            const roomsWithLinks = {}

            server.rooms.foreach(room => {
                rolesWithLinks[room.id] = addLink(
                    room,
                    `${baseLink}/rooms/`
                )
            })
            server.members.forEach(member => {
                membersWithLinks[member.id] = addLink(
                    {...member, name:member.nickname},
                    `${baseLink}/members/`
                )
            });
            gotRoles.forEach(role => {
                rolesWithLinks[role.id] = addLink(
                    role,
                    `${baseLink}/roles/`
                )
            });

            setRooms(roomsWithLinks)
            setMembers(membersWithLinks)
            setRoles(rolesWithLinks)
        }
        getServerInfo()
        setIsLoading(false)
    }, [roles, rooms, members, isLoading, serverId, serverInfo])

    if(isLoading) {
        return <LoadingScreen/>
    }

    return (
        <ServerPageContext.Provider value={
            serverInfo,
            rooms,
            members,
            roles,
            isLoading,
            setServerInfo,
            setRooms,
            setRoles,
            setMembers,
            setIsLoading
        }>
            <ServerNavBar/>
            <ServerFrame>
                {children}
            </ServerFrame>
        </ServerPageContext.Provider>
    )
}

export default ServerPage