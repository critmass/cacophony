import React from "react";
import SidebarElement from "./SidebarElement";
import "./Sidebar.css"
import { Redirect } from "react-router";

const Sidebar = ({data, className, defaultImg=null}) => {
    try {
        return (<ul className={`Sidebar ${className}`}>
            {data.map( line => {
                return (<li key={line.key} className={"Sidebar-li"}>
                    <SidebarElement
                        data={{
                            ...line,
                            picture_url:line.picture_url ?
                                line.picture_url : defaultImg
                        }}
                    />
                </li>)
            })}
        </ul>)
    } catch (error) {
        return <Redirect to="/"/>
    }
}

export default Sidebar