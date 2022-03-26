import React from "react";
import ServerNavMenu from "../ServerNavMenu/ServerNavMenu";
import MembersSidebar from "../Sidebar/MembersSidebar";
import RoomSidebar from "../Sidebar/RoomSidebar";
import "./ServerFrame.css"

const ServerFrame = ({children}) => {
    return (<>
        <ServerNavMenu/>
        <div className="row ServerFrame-row">
            <div className="col-2 ServerFrame-RoomSidebar">
                <RoomSidebar/>
            </div>
            <div className="col-8 ServerFrame-Main">
                {children}
            </div>
            <div className="col-2 ServerFrame-MembersSidebar">
                <MembersSidebar/>
            </div>
        </div>
    </>)
}

export default ServerFrame