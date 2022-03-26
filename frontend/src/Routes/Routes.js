import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux"
import Home from "../Components/Home/Home";
import Logout from "../helpers/Logout";
import FrontPage from "../Components/Home/FrontPage";
import LoginPage from "../Components/Authorization/LoginPage";
import ServerPage from "../Components/ServerPage/ServerPage";
import RoomScreen from "../Components/RoomScreen/RoomScreen";
import NotFound404 from "../Components/NotFound404/NotFound404";
import AddServerPage from "../Components/AddServerPage/AddServerPage";
import RegistrationPage from "../Components/Authorization/RegisterationPage";
import ServerWelcomePage from "../Components/ServerWelcomePage/ServerWelcomePage";
import UserProfileScreen from "../Components/ProfileScreen/UserProfileScreen";
import UpdateUserProfile from "../Components/UpdateScreen/UpdateUserProfile";
import ManagerServerRooms from "../Components/ManageServer/Rooms/ManageServerRooms";
import ManageServerMembers from "../Components/ManageServer/Members/ManageServerMembers";
import ServerSettingsScreen from "../Components/ManageServer/Settings/ServerSettingsScreen";
import MembershipProfileScreen from "../Components/ProfileScreen/MembershipProfileScreen";
import UpdateMembershipProfile from "../Components/UpdateScreen/UpdateMemberProfile";

const Routes = () => {
    const {id} = useSelector(state => state.user)
    return (<Switch>
        <Route exact path={"/"}>
            { id ? <Home/> : <FrontPage/> }
        </Route>
        <Route exact path={`/login`}>
            <LoginPage/>
        </Route>
        <Route exact path={'/logout'}>
            <Logout/>
        </Route>
        <Route exact path={"/signup"}>
            <RegistrationPage/>
        </Route>
        <ProtectedRoute exact path="/profile">
            <Redirect to={`/profile/${id}`}/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/:userId">
            <UserProfileScreen/>
        </ProtectedRoute>
        <ProtectedRoute exact path={`/profile/:userId/update`}>
            <UpdateUserProfile/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/server/add">
            <AddServerPage/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/server/:serverId">
            <ServerPage>
                <ServerWelcomePage/>
            </ServerPage>
        </ProtectedRoute>
        <ProtectedRoute exact path="/server/:serverId/room">
            <ServerPage>
                <ManagerServerRooms/>
            </ServerPage>
        </ProtectedRoute>
        <ProtectedRoute exact path="/server/:serverId/room/:roomId">
            <ServerPage>
                <RoomScreen/>
            </ServerPage>
        </ProtectedRoute>
        <ProtectedRoute exact path="/server/:serverId/member">
            <ServerPage>
                <ManageServerMembers/>
            </ServerPage>
        </ProtectedRoute>
        <ProtectedRoute exact path="/server/:serverId/settings">
            <ServerPage>
                <ServerSettingsScreen/>
            </ServerPage>
        </ProtectedRoute>
        <ProtectedRoute exact path="/server/:serverId/member/:memberId">
            <ServerPage>
                <MembershipProfileScreen/>
            </ServerPage>
        </ProtectedRoute>
        <ProtectedRoute exact path="/server/:serverId/update-profile/:memberId">
            <ServerPage>
                <UpdateMembershipProfile/>
            </ServerPage>
        </ProtectedRoute>
        <Route>
            <NotFound404 />
        </Route>
    </Switch>)
}

export default Routes