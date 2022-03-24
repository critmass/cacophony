import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./ServerNavbar.css"

const ServerNavBar = () => {
    const {serverId} = useParams()
    const memberships = useSelector(state => state.memberships)
    const membership = memberships.find(m => {
        return Number(m.server.id) === Number(serverId)
    })
    return (<div className="row ServerNavBar-navbar">
        <div className="col">
            <Link
                to={`/server/${serverId}/update-profile/${membership.id}`}
                className="ServerNavBar-Link"
            >
                Update Membership
            </Link>
        </div>
        {membership.role.is_admin ?
            (<>
                <div className="col">
                    <Link
                        to={`/server/${serverId}/member`}
                        className="ServerNavBar-Link"
                    >
                        Manage Memberships
                    </Link>
                </div>
                <div className="col">
                    <Link
                        to={`/server/${serverId}/room`}
                        className="ServerNavBar-Link"
                    >
                        Manage Rooms
                    </Link>
                </div>
                {/* <div className="col">
                    <Link
                        to={`/server/${server.id}/role`}
                        className="ServerNavBar-Link"
                    >
                        Manage Roles
                    </Link>
                </div> */}
            </>) :
            (<div className="col-10"></div>)
        }
    </div>)
}

export default ServerNavBar