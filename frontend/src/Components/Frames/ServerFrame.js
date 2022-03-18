import React from "react";
import ServerNavBar from "../NavBar/ServerNavbar";
import MembersSidebar from "../Sidebar/MembersSidebar";
import RoomSidebar from "../Sidebar/RoomSidebar";

const ServerFrame = ({children}) => {
    return (<>
        <ServerNavBar/>
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