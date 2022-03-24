import React from "react";
import { useSelector } from "react-redux";
import "./Home.css"

const Home = () => {
    const user = useSelector(state => state.user)
    return (<h1 className="display-1 Home">
        Welcome {user.username}!
    </h1>)
}

export default Home