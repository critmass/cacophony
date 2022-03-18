import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "reactstrap";

const MainNavBar = () => {
    const token = useSelector(state => state.token)
    if(token) {
        return (<div className="">
            <Navbar>
                <Nav>
                    <NavItem>
                        <NavLink to="/server/add">
                            <span className="MainNavBar-link">
                                Add New Server
                            </span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/profile">
                            <span className="MainNavBar-link">
                                Profile
                            </span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/logout">
                            <span className="MainNavBar-link">
                                Logout
                            </span>
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