import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CacophonyApi from "../../helpers/CacophonyAPI";
import IconImage from "../IconImage/IconImage";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import NotFound404 from "../NotFound404/NotFound404";
import "./MembershipProfileScreen.css"

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
        return (<div className="MembershipProfileScreen">
            <IconImage
                img={membership.picture_url}
                className={"MembershipProfileScreen-IconImage"}
            />
            <h1 className="display-1">
                {membership.nickname} Membership Profile
            </h1>
            <h2 className="h4">
                #{membership.id}
            </h2>
            <p>
                <span className="MembershipProfileScreen-title">
                    Role:
                </span>
                <span className="MembershipProfileScreen-content">
                    {membership.role.title}
                </span><br/>
                <span className="MembershipProfileScreen-title">
                    User:
                </span>
                <span className="MembershipProfileScreen-content">
                    #{membership.user_id}
                </span>
            </p>
        </div>)

    } catch (error) {
        return <NotFound404/>
    }
}

export default MembershipProfileScreen