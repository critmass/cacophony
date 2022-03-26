import React from "react";
import ManageServerMemberList from "./current members/ManageServerMemberList";
import ManageServerMemberAdditions from "./new members/ManageServerMemberAdditions";
import "./ManageServerMembers.css"

const ManageServerMembers = () => {

    return (<div className="row ManageServerMembers">
        <h1 className="ManageServerMembers-title display-4">
            Manage Members
        </h1>
        <div className="col ManageServerMembers-ManageServerMemberList">
            <ManageServerMemberList/>
        </div>
        <div className="col ManageServerMembers-ManageServerMemberAdditions">
            <ManageServerMemberAdditions/>
        </div>
    </div>)
}

export default ManageServerMembers