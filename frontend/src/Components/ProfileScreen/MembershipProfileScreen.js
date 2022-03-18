import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CacophonyApi from "../../helpers/CacophonyAPI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import NotFound404 from "../NotFound404/NotFound404";

const MembershipProfileScreen = () => {
    const {serverId, memberId} = useParams()
    const [membership, setMembership] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getMemberInfo = async () => {
            const member = await CacophonyApi.getMembership(memberId, serverId)
            setMembership(member)
            setIsLoading(false)
        }
        getMemberInfo()
    }, [serverId, memberId])

    if(isLoading) return <LoadingScreen/>
    try {
        return (<div>
            <h1 className="display-1">
                {membership.nickname} Membership Profile
            </h1>
            <h2 className="h4">
                #{membership.id}
            </h2>
            <p>
                Role: {membership.role.title}
            </p>
            <p>
                Image: {membership.picture_url}
            </p>
            <img src={membership.picture_url}/>
        </div>)

    } catch (error) {
        return <NotFound404/>
    }
}

export default MembershipProfileScreen