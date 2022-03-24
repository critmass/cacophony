import React from "react";
import MainSidebar from "../Sidebar/MainSidebar";
import "./MainFrame.css"

const MainFrame = ({children}) => {
    return (<div className="container px-0 mx-0 MainFrame-container">
        <div className="row MainFrame-row">
            <div className="col-2 MainFrame-Sidebar">
                <MainSidebar/>
            </div>
            <div className="col-10 MainFrame-main-page">
                {children}
            </div>
        </div>
    </div>)
}

export default MainFrame