import React from "react";
import { DEFAUT_IMAGE_URL } from "../../../../defaultSettings";
import IconImage from "../../../IconImage/IconImage";
import ManageServerMemberRoleDropdown from "./ManageServerMemberRoleDropdown";

const ManageServerMemberEntry = ({
    memberInfo,
    dropdownIsOpen,
    toggle
}) => {

    return (<>
        <IconImage
            img={
                memberInfo.picture_url ?
                    memberInfo.picture_url :
                    DEFAUT_IMAGE_URL
                }
        />
        {memberInfo.nickname} (#{memberInfo.user_id})
        <ManageServerMemberRoleDropdown
            memberInfo={memberInfo}
            isOpen={dropdownIsOpen}
            toggle={toggle}
        />
    </>)
}

export default ManageServerMemberEntry