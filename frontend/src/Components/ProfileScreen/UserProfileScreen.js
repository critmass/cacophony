import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button } from "reactstrap";
import CacophonyApi from "../../helpers/CacophonyAPI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import PS_MembershipInfo from "./PS_MembershipInfo";
import { v4 as uuid } from "uuid"

const UserProfileScreen = () => {
    const {userId} = useParams()
    const {id} = useSelector(state => state.user)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    const handleClick = () => {
        history.push()
    }
    useEffect(()=> {
        const getUserForPage = async () => {
            const userData = await CacophonyApi.getUser(userId)
            setUser(userData)
            setIsLoading(false)
        }
        getUserForPage()
    }, [userId])

    if(isLoading) return <LoadingScreen/>
    return (<div>
        <h1 className="Display-1">
            {user.username}
        </h1>
        <h2 className="h2">
            USER ID: # {user.id}
        </h2>
        <h3 className="h1">
            Memberships:
        </h3>
        <ul>
            {user.memberships.map(membership => {
                return (<li key={`${uuid()}`}>
                    <PS_MembershipInfo data={membership}/>
                </li>)
            })}
        </ul>
        {Number(id) === Number(userId) ?
            <Link to={`/profile/${userId}/update`} className="btn">
                UPDATE
            </Link> :
            <></>
        }
    </div>)
}

export default UserProfileScreen