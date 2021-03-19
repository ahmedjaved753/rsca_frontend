import React, { useState } from 'react'
import DataVisualizationSVG from "../../components/DataVisualizationSVG/DataVisualizationSVG";
import RscaLogo from "../../components/RscaLogo/RscaLogo";
import SigninForm from "../../components/SigninForm/SigninForm";
import Footer from "../../components/Footer/Footer";
import PasswordResetModal from "../../components/PasswordResetModal";
import './Signin.css'

function Signin() {

    const [modalIsOpen, setModalIsOpen] = useState(true)

    return (
        <div className="signin-container">
            <RscaLogo />
            <DataVisualizationSVG />
            <SigninForm />
            <Footer />
            <PasswordResetModal modalIsOpen={modalIsOpen} />
        </div>
    )
}

export default Signin
