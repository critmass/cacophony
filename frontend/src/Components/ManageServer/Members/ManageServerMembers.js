import React from "react";
import ManagerServerMemberList from "./current members/ManageServerMemberList";
import ManageServerMemberAdditions from "./new members/ManageServerMemberAdditions";
import "./ManageServerMembers.css"

const ManageServerMembers = () => {

    return (<div className="row">
        <div className="col">
            <ManagerServerMemberList/>
        </div>
        <div className="col">
            <ManageServerMemberAdditions/>
        </div>
    </div>)
}

export default ManageServerMembers