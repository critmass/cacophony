import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import { getServer } from "../../../../Actions/serverActionMaker";
import CacophonyApi from "../../../../helpers/CacophonyAPI";

const ManageServerMemberRoleDropdown = ({
    memberInfo,
    isOpen,
    toggle
}) => {
    const server = useSelector(state => state.server)
    const dispatch = useDispatch()

    const selectRole = e => {
        const {roleId} = e.target
        CacophonyApi.updateMembership(memberInfo.id, server.id, {roleId})
        dispatch(getServer(server.id))
    }
    useEffect(() => {

    })
    return (<Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle>
            {memberInfo.role.title}
        </DropdownToggle>
        <DropdownMenu>
            {server.roles.map(role => {
                if(role.id === memberInfo.role.id) return <></>
                else return (
                    <DropdownItem roleId={role.id} onClick={selectRole}>
                        {role.title}
                    </DropdownItem>
                )
            })}
        </DropdownMenu>
    </Dropdown>)
}

export default ManageServerMemberRoleDropdown