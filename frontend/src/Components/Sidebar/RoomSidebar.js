import React, { useContext } from "react";
import ServerPageContext from "../../Context/ServerPageContext";
import Sidebar from "./Sidebar";

const RoomSidebar = () => {
    const {rooms} = useContext(ServerPageContext)

    return (
        <Sidebar
            data={rooms}
            className={"RoomSidebar"}
        />
    )
}

export default RoomSidebar