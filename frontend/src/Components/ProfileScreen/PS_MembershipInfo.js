import React from "react";
import "./PS_MembershipInfo.css"

const PS_MembershipInfo = ({data}) => {
    return (<>
        <span className="PS_MembershipInfo-server-title">
            Server:
        </span>
        <span className="PS_MemebershipInfo-server-content">
            {data.server.name}
        </span>  <br/>
        <span className="PS_MemebershipInfo-nickname-title">
            Nickname:
        </span>
        <span className="PS_MemebershipInfo-nickname-content">
            {data.nickname}
        </span>  <br/>
        <span className="PS_MemebershipInfo-role-title">
            Role:
        </span>
        <span className="PS_MemebershipInfo-role-content">
            {data.role.title}
        </span>
    </>)
}

export default PS_MembershipInfo