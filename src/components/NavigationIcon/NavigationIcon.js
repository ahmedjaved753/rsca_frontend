import React from 'react'
import { useLocation, Link } from "react-router-dom"
import './navigation-icon.css'


function NavigationIcon({ Filled, OutLined, forRoute, ...props }) {
    let { pathname } = useLocation();
    const iconStyles = {
        height: "40%",
        width: "100%",
        color: "#333951"
    };
    if (pathname === '/posts') pathname = '/search'; //did it to show background on search icon and show filled search icon
    var className = `icon-wrapper ${pathname === forRoute ? 'background' : ""}`
    return (
        <Link to={forRoute} className={`icon-container ${props.cssClasses}`}>
            <div className={className}>
                {pathname === forRoute ? <Filled {...props} style={{ ...iconStyles, color: "#333951" }} /> : <OutLined {...props} style={iconStyles} />}
            </div>
        </Link>
    )
}

export default NavigationIcon
