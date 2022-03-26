import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
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
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const selectRole = async e => {
        const {name} = e.target
        await CacophonyApi.updateMembership(
            memberInfo.id,
            server.id,
            {roleId:Number(name)}
        )
        dispatch(getServer(server.id))
    }

    const removeMembership = async () => {
        try {
            let isCurrentUser = memberInfo.user_id === user.id
            await CacophonyApi.removerMembership(
                memberInfo.id,
                server.id
            )
            if(isCurrentUser) history.push("/")
            else dispatch(getServer(server.id))
        } catch (err) {

        }
    }

    if(
        memberInfo.user_id !== user.id ||
        server.members.filter( member => {
            return member.role.is_admin
        }).length > 1
    ){
        return (<Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle>
                {memberInfo.role.title}
            </DropdownToggle>
            <DropdownMenu>
                {server.roles.map(role => {
                    if(role.id === memberInfo.role.id) return <></>
                    else return (
                        <DropdownItem name={role.id} onClick={selectRole}>
                            {role.title}
                        </DropdownItem>
                    )
                })}
                <DropdownItem onClick={removeMembership}>
                    Remove
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>)
    }
    else {
        return (<Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle>
                {memberInfo.role.title}
            </DropdownToggle>
            <DropdownMenu>
                {server.roles.map(role => {
                    if (role.id === memberInfo.role.id) return <></>
                    else return (
                        <DropdownItem disabled>
                            {role.title}
                        </DropdownItem>
                    )
                })}
                <DropdownItem disabled>
                    Remove
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>)
    }
}

export default ManageServerMemberRoleDropdown