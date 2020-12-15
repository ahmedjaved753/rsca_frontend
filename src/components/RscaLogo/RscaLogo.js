import React from 'react'
import { ReactComponent as RscaLogoSVG } from '../svgs/logo.svg';
import './rsca-logo.css'

function RscaLogo() {
    return (
        <div className="logo-container">
            <RscaLogoSVG />
        </div>
    )
}

export default RscaLogo
