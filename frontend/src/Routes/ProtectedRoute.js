import React, { useContext } from "react"
import { Redirect, Route } from "react-router-dom"
import DataContext from "../context/DataContext"


const ProtectedRoute = ({path, exact=false, children}) => {
    const {currentUsername} = useContext(DataContext)
    return (<Route exact={exact} path={path}>
        {currentUsername ?
            children :
            <Redirect to="/"/>}
    </Route>)
}

export default ProtectedRoute