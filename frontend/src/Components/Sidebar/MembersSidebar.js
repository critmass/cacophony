import React from "react";
import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import { DEFAUT_IMAGE_URL } from "../../defaultSettings";

const MembersSidebar = () => {
    const server = useSelector(state => state.server)

    return (
        <Sidebar
            data={server.members}
            className={"MembersSidebar"}
            defaultImg={DEFAUT_IMAGE_URL}
        />
    )
}

export default MembersSidebar