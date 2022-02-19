import React from "react";
import MembersSidebar from "../Sidebar/MembersSidebar";
import RoomSidebar from "../Sidebar/RoomSidebar";

const ServerFrame = ({children}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <RoomSidebar/>
                </div>
                <div className="col-8">
                    {children}
                </div>
                <div className="col-2">
                    <MembersSidebar/>
                </div>
            </div>
        </div>
    )
}

export default ServerFrame