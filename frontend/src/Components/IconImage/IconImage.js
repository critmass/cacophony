import React from "react";
import "./IconImage.css"

const IconImage = ({img}) => {
    return (
        <img src={img} className={`IconImage`}/>
    )
}

export default IconImage