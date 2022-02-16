import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux"

const MainSidebar = () => {
    const memberships = useSelector(state => state.memberships)
    return <Sidebar data={memberships.map(membership => {
        return {...membership, link:`/server/${membership.server.id}`}
    })}/>
}

export default MainSidebar