import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "reactstrap";
import useLogout from "../../hooks/useLogout";

const MainNavBar = () => {
    const token = useSelector(state => state.token)
    const logout = useLogout()
    if(token) {
        return (<div>
            <Navbar>
                <Nav>
                    <NavItem>
                        <NavLink to="/server">
                            Server List
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/server/add">
                            Add New Server
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/profile">
                            Profile
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={logout}>
                            Logout
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>)
    }
    else {
        return (<div>
            <Navbar>
                <Nav>
                    <NavItem>
                        <NavLink to="/signup">
                            Sign Up
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/login">
                            Log In
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>)
    }
}

export default MainNavBar