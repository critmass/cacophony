import React from "react";
import MainSidebar from "../Sidebar/MainSidebar";

const MainFrame = ({children}) => {
    return (<div className="container">
        <div className="row">
            <div className="col-2">
                <MainSidebar/>
            </div>
            <div className="col-10">
                {children}
            </div>
        </div>
    </div>)
}

export default MainFrame