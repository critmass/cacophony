import React from "react";
import IconImage from "../IconImage/IconImage";
import {} from "react-router-dom"

const SidebarElement = ({data}) => {
    return (<Link to={data.link}>

        {data.picture_url ?
            <IconImage img={data.picture_url} /> :
            "-"
        }
        {data.name}
    </Link>)
}

export default SidebarElement