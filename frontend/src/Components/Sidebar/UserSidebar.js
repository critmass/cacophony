import React from "react";

import Sidebar from "./Sidebar";

const UserSidebar = ({ users }) => {
    const reformattedUsers = users.map(user => {
        return {...user, name:username, link:`profile/${user.id}`}
    })
    return <Sidebar data={reformattedUsers} className={"ServerSidebar"} />
}

export default UserSidebar