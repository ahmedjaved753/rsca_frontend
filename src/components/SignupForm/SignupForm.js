import React from 'react'
import Input from '../Inputbox/Inputbox';
import { Button } from 'antd';
import { FaKey } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import './signup-form.css'


function SignupForm() {

    return (

        <form className="signup-form">
            <Input placeholder="Name" name="name" prefixIcon={FaRegUser} />
            <Input placeholder="Username" name="username" prefixIcon={FaRegUser} />
            <Input placeholder="Email" name="email" prefixIcon={FaRegEnvelope} />
            <Input placeholder="Password" name="password" prefixIcon={FaKey} />
            <Input
                placeholder="Confirm Password"
                name="confirm-password"
                prefixIcon={FaKey} />
            <Button style={{ alignSelf: "center", backgroundColor: "#5F2EEA", paddingRight: "30px", paddingLeft: "30px", }} type="primary" shape="round" size="large">
                Signup
            </Button>
            <div className="below-button-message">Already have an account? <b className="bold-signIn">SignIn</b></div>
        </form>

    )
}

export default SignupForm
