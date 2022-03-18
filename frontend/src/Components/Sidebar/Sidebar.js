import React from "react";
import SidebarElement from "./SidebarElement";
import "./Sidebar.css"
import { Redirect } from "react-router";

const Sidebar = ({data, className, defaultImg=null}) => {
    try {
        return (<div className={className}>
            <ul className={`Sidebar`}>
                {data.map( line => {
                    return (<li key={line.key}>
                        <SidebarElement
                            data={{
                                ...line,
                                picture_url:line.picture_url ?
                                    line.picture_url : defaultImg
                            }}
                        />
                    </li>)
                })}
            </ul>
        </div>)
    } catch (error) {
        return <Redirect to="/"/>
    }
}

export default Sidebar