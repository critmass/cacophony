import React from "react";

const MembershipProfileScreen = ({membership}) => {
    return (<div>
        <h1 className="display-1">
            {membership.nickname} Membership Profile
        </h1>
        <h2 className="h4">
            #{membership.id}
        </h2>
        <p>
            Role: {membership.role.title}
        </p>
        <p>
            Image: {membership.picture_url}
        </p>
        <img src={membership.picture_url}/>
    </div>)
}

export default MembershipProfileScreen