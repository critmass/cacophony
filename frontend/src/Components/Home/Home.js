import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector(state => state.user)
    return (<h1 className="display-1">
        Welcome {user.username}!
    </h1>)
}

export default Home