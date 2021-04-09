import React, { useContext, useState } from 'react'
import { GET_TOKEN } from '../../helpers/routes';
import useFormData from '../../hooks/useFormData';
import { authContext } from '../../contexts/AuthContext/AuthProvider'
import { message } from 'antd';
import axios from 'axios'
import './login-form.css'

function LoginForm() {

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
        // <div className="login-form-container">
        <form className="login-form" onSubmit={handleOnSubmit}>
            <h1 style={{ justifySelf: 'center' }}>LOGIN</h1>
            <div className="input-container">
                <h3 style={{ paddingLeft: "4rem" }}>ORGANIZATIONAL ID: </h3>
                <input type="text" />
            </div>
            <div className="input-container">
                <h3>USERNAME: </h3>
                <input type="text" value={formData.username} name="username" onChange={handleOnchange} />
            </div>
            <div className="input-container">
                <h3>PASSWORD: </h3>
                <input type="password" value={formData.password} name="password" onChange={handleOnchange} />
            </div>
            <button className="login-submit-button" type="submit">{loading ? <div class="loader"></div> : "Submit"}</button>
        </form>
        // </div>
    )
}

export default LoginForm
