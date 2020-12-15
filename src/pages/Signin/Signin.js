import React from 'react'
import DataVisualizationSVG from "../../components/DataVisualizationSVG/DataVisualizationSVG";
import RscaLogo from "../../components/RscaLogo/RscaLogo";
import SigninForm from "../../components/SigninForm/SigninForm";
import Footer from "../../components/Footer/Footer";
import './Signin.css'

function Signin() {
    return (
        <div className="signin-container">
            <RscaLogo />
            <DataVisualizationSVG />
            <SigninForm />
            <Footer />
        </div>
    )
}

export default Signin
