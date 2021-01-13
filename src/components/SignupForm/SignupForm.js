import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";
import { authContext } from '../../contexts/AuthContext/AuthProvider'
import Input from '../Inputbox/Inputbox';
import { Button, message } from 'antd';
import { FaKey } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { splitName, matchPasswords, passwordIsCorrect } from '../../helpers/formValidation'
import './signup-form.css'
import { REGISTER } from '../../routes';
import useFormData from '../../hooks/useFormData';


function SignupForm() {
    const [formData, handleOnchange] = useFormData({ name: "", username: "", email: "", password: "", confirmPassword: "" })
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { logout } = useContext(authContext)

    function handleOnSubmit(e) {
        e.preventDefault()
        const { name, username, email, password, confirmPassword } = formData;
        const { firstname: first_name, lastname: last_name } = splitName(name);
        if (!matchPasswords(password, confirmPassword)) {
            message.error("Both passwords don't match");
            return;
        }
        if (!passwordIsCorrect(password)) {
            message.error("Password must contain one uppercase, one lowercase, one number and must be of length 8 to 25");
            return;
        } setLoading(true);
        console.log(formData);
        axios.post(REGISTER, { first_name, last_name, username, email, password })
            .then(response => {
                setLoading(false);
                console.log("post request to /api/users/register completed");
                console.log(response);
                console.log(response.data);
                message.success("Signed up successfully!")
                history.push('/login');
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

    useEffect(() => logout(), [logout])

    return (

        <form className="signup-form" onSubmit={handleOnSubmit}>
            <Input placeholder="Name" value={formData.name} name="name" PrefixIcon={FaRegUser} onChange={handleOnchange} />
            <Input placeholder="Username" value={formData.username} name="username" PrefixIcon={FaRegUser} onChange={handleOnchange} />
            <Input type="email" value={formData.email} placeholder="Email" name="email" PrefixIcon={FaRegEnvelope} onChange={handleOnchange} />
            <Input type="password" value={formData.password} placeholder="Password" name="password" PrefixIcon={FaKey} onChange={handleOnchange} />
            <Input
                type="password"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                name="confirmPassword"
                PrefixIcon={FaKey}
                onChange={handleOnchange} />
            <Button htmlType="submit" loading={loading} style={{ alignSelf: "center", backgroundColor: "#5F2EEA", paddingRight: "30px", paddingLeft: "30px", }} type="primary" shape="round" size="large">
                Signup
            </Button>
            <div className="below-button-message">Already have an account? <b className="bold-signIn"><Link to="/login">SignIn</Link></b></div>
        </form>

    )
}

export default SignupForm
