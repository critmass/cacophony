import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux"
import Home from "../Components/Home/home";
import FrontPage from "../Components/FrontPage/FrontPage";
import ServerPage from "../Components/ServerPage/ServerPage";
import LoginPage from "../Components/Authorization/LoginPage";
import UserProfileScreen from "../Components/ProfileScreen/ProfileScreen";
import RoomScreen from "../Components/RoomScreen/RoomScreen";
import RegistrationPage from "../Components/Authorization/RegisterationPage";

const Routes = () => {
    const {id} = useSelector(state => state.user)
    return (<Switch>
        <Route exact path={"/"}>
            { id ? <Home/> : <FrontPage/> }
        </Route>
        <Route exact path={`/login`}>
            <LoginPage/>
        </Route>
        <Route exact path={"/signup"}>
            <RegistrationPage/>
        </Route>
        <ProtectedRoute exact path="/profile">
            <Redirect to={`/profile/${id}`}/>
        </ProtectedRoute>
        <ProtectedRoute path="/profile/:userId">
            <UserProfileScreen/>
        </ProtectedRoute>
        <ProtectedRoute path="/profile/update">

        </ProtectedRoute>
        {/* <ProtectedRoute exact path="/server">
            <ServerList/>
        </ProtectedRoute> */}
        <ProtectedRoute exact path="/server/:serverId">
            <ServerPage>
                <div></div>
            </ServerPage>
        </ProtectedRoute>
        {/* <ProtectedRoute exact path="/server/:serverId/settings">
            <ServerPage>
                <ServerSettingsScreen/>
            </ServerPage>
        </ProtectedRoute> */}
        <ProtectedRoute path="/server/:serverId/rooms/:roomId">
            <ServerPage>
                <RoomScreen/>
            </ServerPage>
        </ProtectedRoute>
        {/* <ProtectedRoute path="/server/:serverId/members/:memberId">
            <ServerPage>
                <MemberProfileScreen/>
            </ServerPage>
        </ProtectedRoute> */}
    </Switch>)
}

export default Routes