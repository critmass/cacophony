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
        <span className="ManageServerMemberEntry-name">
            {memberInfo.nickname}
        </span>
        <span className="ManageServerMemberEntry-id">
            (#{memberInfo.user_id})
        </span>
        <ManageServerMemberRoleDropdown
            memberInfo={memberInfo}
            isOpen={dropdownIsOpen}
            toggle={toggle}
        />
    </>)
}

export default ManageServerMemberEntry