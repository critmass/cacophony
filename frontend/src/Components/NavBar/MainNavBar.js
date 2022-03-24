import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "reactstrap";
import "./MainNavBar.css"

const MainNavBar = () => {
    const token = useSelector(state => state.token)
    if(token) {
        return (<div className="">
            <Navbar>
                <Nav>
                    <NavItem>
                        <NavLink
                            to="/server/add"
                            className="MainNavBar-link"
                        >
                            Add New Server
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="/profile"
                            className="MainNavBar-link"
                        >
                            Profile
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="/logout"
                            className="MainNavBar-link"
                        >
                            Logout
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>)
    }
    else {
        return (<div className="">
            <Navbar>
                <Nav>
                    <NavItem>
                        <NavLink to="/signup">
                            <span className="MainNavBar-link">
                                Sign Up
                            </span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/login">
                            <span className="MainNavBar-link">
                                Log In
                            </span>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>)
    }
}

export default MainNavBar