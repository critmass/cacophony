import React from "react";

import Sidebar from "./Sidebar";

const MembersSidebar = ({ Members }) => {

    return <Sidebar data={Members} className={"ServerSidebar"} />
}

export default MembersSidebar