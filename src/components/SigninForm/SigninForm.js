import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../contexts/AuthContext/AuthProvider'
import axios from 'axios'
import Input from '../Inputbox/Inputbox';
import { Button, message } from 'antd';
import { FaKey } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GET_TOKEN } from '../../routes';
import useFormData from '../../hooks/useFormData';
import './signin-form.css'

function SigninForm() {
    const [loading, setLoading] = useState(false);
    const [formData, handleOnchange] = useFormData({ username: "", password: "" });
    const { login } = useContext(authContext)
    function handleOnSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const { username, password } = formData;
        console.log(formData);
        axios.post(GET_TOKEN, { username, password })
            .then(response => {
                setLoading(false);
                console.log("post request to /api/grttoken completed");
                console.log(response.data);
                login(response.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log("error aaya");
                console.log(error.response);
                for (let msg in error.response.data) {
                    error.response.data[msg].forEach(m => message.error(msg + ": " + m));
                }
            })
    }
    return (
        <form className="signin-form" onSubmit={handleOnSubmit}>
            <Input placeholder="Username" value={formData.username} name="username" PrefixIcon={FaRegUser} onChange={handleOnchange} />
            <Input type="password" value={formData.password} placeholder="Password" name="password" PrefixIcon={FaKey} onChange={handleOnchange} />
            <span className="forgot-password">Forgot Password</span>
            <Button loading={loading} htmlType="submit" style={{ alignSelf: "center", backgroundColor: "#5F2EEA", paddingRight: "30px", paddingLeft: "30px", }} type="primary" shape="round" size="large">
                Login
            </Button>
            <div className="below-button-message">Don't have an account? <b><Link to="/signup">SignUp</Link></b></div>
        </form>
    )
}

export default SigninForm
