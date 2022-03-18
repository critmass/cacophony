import React from "react";

const PS_MembershipInfo = ({data}) => {
    return (<>
        Server:<span>{data.server.name}</span>  <br/>
        Nickname:<span>{data.nickname}</span>  <br/>
        Role:<span>{data.role.title}</span>
    </>)
}

export default PS_MembershipInfo