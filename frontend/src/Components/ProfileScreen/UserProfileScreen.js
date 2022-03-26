import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CacophonyApi from "../../helpers/CacophonyAPI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import PS_MembershipInfo from "./PS_MembershipInfo";
import { v4 as uuid } from "uuid";
import "./UserProfileScreen.css"
import IconImage from "../IconImage/IconImage";
import { DEFAUT_IMAGE_URL } from "../../defaultSettings";

const UserProfileScreen = () => {
    const {userId} = useParams()
    const {id} = useSelector(state => state.user)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        const getUserForPage = async () => {
            const userData = await CacophonyApi.getUser(userId)
            setUser(userData)
            setIsLoading(false)
        }
        getUserForPage()
    }, [userId])

    if(isLoading) return <LoadingScreen/>
    return (<div className="UserProfileScreen">
        <IconImage
            img={
                user.picture_url ?
                    user.picture_url:
                    DEFAUT_IMAGE_URL
            }
            className={"UserProfileScreen-IconImage"}
        />
        <h1 className="Display-1 UserProfileScreen-username">
            {user.username}
        </h1>
        <h2 className="h2 UserProfileScreen-userId">
            <span className="UserProfileScreen-userId-title">
                USER ID: #
            </span>
            <span className="UserProfileScreen-userId-id">
                {user.id}
            </span>
        </h2>
        <h3 className="h1 UserProfileScreen-membership-header">
            Memberships:
        </h3>
        <ul className="UserProfileScreen-membership-ul">
            {user.memberships.map(membership => {
                return (
                    <li
                        key={`${uuid()}`}
                        className={"UserProfileScreen-membership-li"}
                    >
                        <PS_MembershipInfo data={membership}/>
                    </li>
                )
            })}
        </ul>
        {Number(id) === Number(userId) ?
            <Link
                to={`/profile/${userId}/update`}
                className="btn btn-dark UserProfileScreen-btn"
            >
                UPDATE
            </Link> :
            <></>
        }
    </div>)
}

export default UserProfileScreen