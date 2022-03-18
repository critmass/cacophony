import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const RoomSidebar = () => {
    const server = useSelector(state => state.server)

    return (
        <Sidebar data={server.rooms} className={"RoomSidebar"} />
    )
}

export default RoomSidebar