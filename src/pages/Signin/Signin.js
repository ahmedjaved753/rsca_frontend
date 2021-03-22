import React, { useState } from 'react'
import DataVisualizationSVG from "../../components/DataVisualizationSVG/DataVisualizationSVG";
import RscaLogo from "../../components/RscaLogo/RscaLogo";
import SigninForm from "../../components/SigninForm/SigninForm";
import Footer from "../../components/Footer/Footer";
import PasswordResetModal from "../../components/PasswordResetModal";
import './Signin.css'

function Signin() {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <div className="signin-container">
            <RscaLogo />
            <DataVisualizationSVG />
            <SigninForm setModalIsOpen={setModalIsOpen} />
            <Footer />
            <PasswordResetModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
        </div>
    )
}

export default Signin
