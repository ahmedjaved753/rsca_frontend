import React, { useContext } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
    RiAdminLine,
    RiAdminFill,
    RiSearchLine,
    RiSearchFill
} from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import NavigationIcon from "../NavigationIcon/NavigationIcon";
import { authContext } from '../../contexts/AuthContext/AuthProvider'
import "./menu.css";


function Menu() {

    const { logout } = useContext(authContext);

    return (
        <div className="outer-container-menu">
            <div className="rcsa-logo">RCSA</div>
            <div className="navigation-icons">
                <NavigationIcon Filled={AiFillHome} OutLined={AiOutlineHome} forRoute="/" />
                <NavigationIcon Filled={RiSearchFill} OutLined={RiSearchLine} forRoute="/search" />
                <NavigationIcon Filled={RiAdminFill} OutLined={RiAdminLine} forRoute="/admin" />
            </div>
            <div className="logout-icon">
                <NavigationIcon OutLined={BiLogOut} onClick={logout} cssClasses="align-end" forRoute='/login' />
            </div>
        </div>
    );
}

export default Menu;