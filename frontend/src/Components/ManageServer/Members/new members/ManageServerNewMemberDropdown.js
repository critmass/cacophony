import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { getServer } from "../../../../Actions/serverActionMaker";
import CacophonyApi from "../../../../helpers/CacophonyAPI";

const ManageServerNewMemberDropdown = ({user, isOpen, toggle}) => {
    const server = useSelector(state => state.server)
    const dispatch = useDispatch()
    const handleSelect = async e => {
        const roleId = Number(e.target.name)
        await CacophonyApi.addMembership(
            server.id,
            roleId,
            user.id,
            user.username,
            user.picture_url
        )
        dispatch(getServer(server.id))
    }
    return (<Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle caret>
            Add User
        </DropdownToggle>
        <DropdownMenu>
            {server.roles.map(role => {
                return (
                    <DropdownItem
                        onClick={handleSelect}
                        name={role.id}
                    >
                        {role.title}
                    </DropdownItem>
                )
            })}
        </DropdownMenu>
    </Dropdown>)
}

export default ManageServerNewMemberDropdown