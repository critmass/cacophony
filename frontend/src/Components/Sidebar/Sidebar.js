import React from "react";
import SidebarElement from "./SidebarElement";

const Sidebar = ({data}) => {
    return (<div className={data.className}>
        <ul className={`Sidebar`}>
            {data.map( line => {
                return (<li>
                    <SidebarElement data={line}/>
                </li>)
            })}
        </ul>
    </div>)
}

export default Sidebar