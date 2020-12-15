import React from 'react'
import Input from '../Inputbox/Inputbox';
import { Button } from 'antd';
import { FaKey } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import './signin-form.css'

function SigninForm() {
    return (
        <form className="signin-form">
            <Input placeholder="Username" name="username" prefixIcon={FaRegUser} />
            <Input placeholder="Password" name="password" prefixIcon={FaKey} />
            <span className="forgot-password">Forgot Password</span>
            <Button style={{ alignSelf: "center", backgroundColor: "#5F2EEA", paddingRight: "30px", paddingLeft: "30px", }} type="primary" shape="round" size="large">
                Signin
            </Button>
            <div className="below-button-message">Don't have an account? <b>SignUp</b></div>
        </form>
    )
}

export default SigninForm
