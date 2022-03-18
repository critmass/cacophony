import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CacophonyApi from "../../../helpers/CacophonyAPI";
import InputGroupBundle from "../../InputGroupBundle/InputGroupBundle";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import SearchForm from "../../SearchForm/SearchForm";
import {v4 as uuid} from "uuid"
import { Button } from "reactstrap";
import { useParams } from "react-router";

const ManageServerMembers = () => {
    const {serverId} = useParams()
    const server = useSelector(state => state.server)
    const [inputs, setInputs] = useState({
        role:server.roles.id
    })
    const [userList, setUserList] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const handleClickToAddMember = userId => {
        CacophonyApi.addMembership()
    }
    const handleClickToChangeRole = memberId => {

    }

    useEffect(() => {
        const getUserList = async () => {
            const downloadedList = await CacophonyApi.getUsers()
            setUserList(downloadedList)
            setIsLoading(false)
        }
        getUserList()
    }, [])

    if(isLoading) return <LoadingScreen/>

    return (<div className="row">
        <div className="col">
            <ul>
                {server.members.map(member => {
                    return (<li onClick>

                    </li>)
                })}
            </ul>
        </div>
        <div className="col">
            <SearchForm
                setResults={setSearchResults}
                dataSet={userList}
                searchBy={"username"}
            />
            {searchResults.filter(user => {
                return user.id !== server.members.user_id
            }).map(user => {
                return (<li key={uuid}>
                    <Button>
                        Add {user.username}
                    </Button>
                </li>)
            })}
        </div>
    </div>)
}

export default ManageServerMembers