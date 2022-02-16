import React from "react";
import RoomSidebar from "../Sidebar/RoomSidebar";
import UserSidebar from "../Sidebar/UserSidebar";

const ServerFrame = ({children}) => {
    return (<div className="container">
        <div className="row">
            <div className="col-2">
                <RoomSidebar/>
            </div>
            <div className="col-8">
                {children}
            </div>
            <div className="col-2">
                <UserSidebar/>
            </div>
        </div>
    </div>)
}

export default ServerFrame