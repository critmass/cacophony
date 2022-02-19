import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"



const ProtectedRoute = ({path, exact=false, children}) => {
    const {username} = useSelector(state => state.user)
    return (<Route exact={exact} path={path}>
        {username ?
            children :
            <Redirect to="/"/>}
    </Route>)
}

export default ProtectedRoute