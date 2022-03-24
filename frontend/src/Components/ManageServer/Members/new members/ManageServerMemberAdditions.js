import React, { useEffect, useState } from "react";
import SearchForm from "../../../SearchForm/SearchForm";
import { useSelector } from "react-redux";
import CacophonyApi from "../../../../helpers/CacophonyAPI";
import LoadingScreen from "../../../LoadingScreen/LoadingScreen";
import ManageServerNewMemberEntry from "./ManageServerNewMemberEntry";

const ManageServerMemberAdditions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const server = useSelector(state => state.server)
    const [userList, setUserList] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [roleDropdownIsOpen, setRoleDropdownIsOpen] = useState({})
    const openRole = userId => {
        setRoleDropdownIsOpen(state => {
            const newState = {}
            Object.keys(state).forEach(key => {
                if (Number(key) === Number(userId) && !state[key]) {
                    newState[key] = true
                }
                else newState[key] = false
            })
            return newState
        })
    }

    useEffect(() => {
        const getUserList = async () => {
            const membersUserIds = new Set()
            for(let member of server.members) {
                membersUserIds.add(Number(member.user_id))
            }
            const downloadedList = await CacophonyApi.getUsers()
            const newUserList = downloadedList.filter(user => {
                return !membersUserIds.has(Number(user.id))
            })
            setUserList(newUserList)
            setRoleDropdownIsOpen(newUserList.reduce((users, user) => {
                users[user.id] = false
                return users
            }, {}))
            setIsLoading(false)
        }
        getUserList()
    }, [server])

    if (isLoading) return (<LoadingScreen />)

    return (<>
        <SearchForm
            setResults={setSearchResults}
            dataSet={userList}
            searchBy={"username"}
        />
        {
            searchResults.map(user => {
                return (<li key={`newUser${user.id}`}>
                    <ManageServerNewMemberEntry
                        user={user}
                        roleDropdownIsOpen={
                            roleDropdownIsOpen[Number(user.id)]
                        }
                        openRole={openRole}
                    />
                </li>)
            })
        }
    </>)
}

export default ManageServerMemberAdditions