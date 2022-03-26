import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import IconImage from "../IconImage/IconImage";

import "./ServerNavMenu.css"

const ServerNavMenu = () => {
    const { serverId } = useParams()
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)
    const membership = useSelector(state => {
        return state.memberships.find(m => {
            return Number(m.server.id) === Number(serverId)
        })}
    )

    const handleToggle = () => {
        setIsOpen(state => !state)
    }

    const handleClick = link => {
        return () => {
            history.push(`/server/${serverId}${link}`)
        }
    }

    return (<div className="row ServerNavMenu-row">
        <Dropdown
            className="ServerNavMenu-Dropdown"
            isOpen={isOpen}
            toggle={handleToggle}
        >
            <DropdownToggle className="ServerNavMenu-DropdownToggle">
                <IconImage
                    img={membership.server.picture_url}
                    className="ServerNavMenu-IconImage"
                />
                {membership.server.name}
            </DropdownToggle>
            <DropdownMenu className="ServerNavMenu-DropdownMenu">
                <DropdownItem
                    onClick={handleClick(
                        `/update-profile/${membership.id}`
                    )}
                    className="ServerNavMenu-DropdownItem"

                >
                    Update Membership
                </DropdownItem>
                { membership.role.is_admin ?
                    (<>
                        <DropdownItem
                            onClick={handleClick(`/member`)}
                            className="ServerNavMenu-DropdownItem"
                        >
                            Manage Members
                        </DropdownItem>
                        <DropdownItem
                            onClick={handleClick(`/room`)}
                            className="ServerNavMenu-DropdownItem"
                        >
                            Manage Rooms
                        </DropdownItem>
                        <DropdownItem
                            onClick={handleClick(`/settings`)}
                            className="ServerNavMenu-DropdownItem"
                        >
                            Manage Server
                        </DropdownItem>
                        </>):<></>
                }
            </DropdownMenu>
        </Dropdown>
    </div>)
}

export default ServerNavMenu