import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CacophonyApi from "../../helpers/CacophonyAPI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ChatLine from "./ChatLine";
import ChatSubmissionLine from "./ChatSubmissionLine";
import {v4 as uuid} from "uuid"
import { useSelector } from "react-redux";

const RoomScreen = () => {
    const {serverId, roomId} = useParams()
    const [lines, setLines] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {server, user} = useSelector(state => state)
    const members = server.members

    useEffect(() => {
        const getContent = async () => {
            const content = await CacophonyApi.getRoom(serverId, roomId)
            const posts = content.posts.sort((a,b) => {
                return a.id - b.id
            })

            setLines(posts)
            setIsLoading(false)
        }
        getContent()

    }, [isLoading, roomId, serverId])

    const reload = () => {
        setIsLoading(true)
    }

    if(isLoading) return <LoadingScreen/>

    return (<div>
        <ul>
            {lines && lines.map(line => {
                return (<li >
                    {
                        user.id === line.poster_id ?
                            <ChatLine
                                poster = {members.find(member => {
                                    return member.id === line.poster_id
                                })}
                                content = {line.content}
                                post_date = {line.post_date}
                                key={uuid()}
                            />:
                            <ChatLine
                                poster = {members.find(member => {
                                    return member.id === line.poster_id
                                })}
                                content = {line.content}
                                post_date = {line.post_date}
                                key={uuid()}
                            />
                    }
                </li>)
            })}
        </ul>
        <ChatSubmissionLine reload={reload}/>
    </div>)
}


export default RoomScreen