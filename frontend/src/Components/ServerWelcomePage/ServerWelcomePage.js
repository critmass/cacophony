import React from "react";
import { useSelector } from "react-redux";
import "./ServerWelcomePage.css"

const ServerWelcomePage = () => {
    const server = useSelector(state => state.server)
    return (<div className="ServerWelcomePage">
        <h1 className="display-3 ServerWelcomePage-title">
            Welcome to <br/>{server.name}
        </h1>
    </div>)
}

export default ServerWelcomePage