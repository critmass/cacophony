import React from "react";
import { useSelector } from "react-redux";

const ServerWelcomePage = () => {
    const server = useSelector(state => state.server)
    return (<div>
        <h1 className="display-3">
            Welcome to {server.name}
        </h1>
    </div>)
}

export default ServerWelcomePage