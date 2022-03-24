import React, { useState } from "react";
import { useSelector } from "react-redux";
import ManageServerMemberEntry from "./ManageServerMemberEntry";

const ManageServerMemberList = () => {
    const server = useSelector(state => state.server)
    const [roleDropdownIsOpen, setRoleDropdownIsOpen] = useState(
        server.members.reduce((members, member) => {
            members[member.id] = false
            return members
        }, {})
    )
    const openRole = memberId => {
        setRoleDropdownIsOpen(state => {
            const newState = {}
            Object.keys(state).forEach(key => {
                if(Number(key) === Number(memberId) && !state[key]) {
                    newState[key] = true
                }
                else newState[key] = false
            })
            return newState
        })
    }

    return (<ul>
        {server.members.map( member => {
            return (<li key={member.key}>
                <ManageServerMemberEntry
                    memberInfo={member}
                    dropdownIsOpen={ roleDropdownIsOpen[member.id] }
                    toggle={ () => openRole(member.id) }
                />
            </li>)
        })}
    </ul>
    )

}

export default ManageServerMemberList