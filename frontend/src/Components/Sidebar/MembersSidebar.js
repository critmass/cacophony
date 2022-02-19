import React, { useContext } from "react";
import ServerPageContext from "../../Context/ServerPageContext";

import Sidebar from "./Sidebar";

const MembersSidebar = () => {
    const {members} = useContext(ServerPageContext)

    return (<Sidebar data={} className={"MembersSidebar"} />)
}

export default MembersSidebar