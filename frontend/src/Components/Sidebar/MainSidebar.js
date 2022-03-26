import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux"
import "./Sidebar.css"

const MainSidebar = () => {
    const memberships = useSelector(state => state.memberships)
    return (
        <Sidebar
            data={memberships.map(membership => {
                const {server} = membership
                return {...server, link:`/server/${server.id}`}
            })}
            className={"MainSidebar"}
        />
    )
}

export default MainSidebar