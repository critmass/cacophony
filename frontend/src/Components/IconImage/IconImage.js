import React from "react";
import "./IconImage.css"

const IconImage = ({img, className}) => {
    return (
        <img src={img} className={`IconImage ${className}`}/>
    )
}

export default IconImage