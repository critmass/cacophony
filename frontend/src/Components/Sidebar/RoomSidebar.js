import React, { useContext } from "react";
import ServerPageContext from "../../Context/ServerPageContext";

import Sidebar from "./Sidebar";

const RoomSidebar = () => {
    const {rooms} = useContext(ServerPageContext)

    return (<div className={"ChatRoomSidebar"}>
        <Sidebar data={rooms}/>
    </div>)
}

export default RoomSidebar