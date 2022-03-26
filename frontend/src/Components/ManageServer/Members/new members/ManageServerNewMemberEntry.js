import React from "react";
import { DEFAUT_IMAGE_URL } from "../../../../defaultSettings";
import IconImage from "../../../IconImage/IconImage";
import ManageServerNewMemberDropdown
    from "./ManageServerNewMemberDropdown";


const ManageServerNewMemberEntry = ({
    user,
    roleDropdownIsOpen,
    openRole
}) => {

    return (<>
        <IconImage img={
            user.picture_url ?
                user.picture_url :
                DEFAUT_IMAGE_URL
            }
        />
        <span className="ManageServerNewMemberEntry-name">
            {user.username}
        </span>
        <span className="ManageServerNewMemeberEntry-id">
            (#{user.id})
        </span>
        <ManageServerNewMemberDropdown
            user={user}
            isOpen={roleDropdownIsOpen}
            toggle={() => openRole(user.id)}
        />
    </>)
}

export default ManageServerNewMemberEntry