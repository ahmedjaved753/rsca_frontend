import React from 'react'
import LoginForm from '../../components/LoginForm'
import LogoNew from '../../components/svgs/LogoNew.png'
import './login.css'

function Login() {
    return (
        <div className="login-page-container">
            <div className="main-content-login">
                <div className="description">
                    <img className="logo" src={LogoNew} alt="logo" />
                    <div className="text">
                        <h1 style={{ color: 'white' }}>Road surface conditions analyzer</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita culpa, doloribus possimus, dignissimos laudantium tempore consequuntur laborum voluptates ea voluptate eligendi in eum sequi aperiam quia, iste sapiente impedit soluta!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita culpa, doloribus possimus, dignissimos laudantium tempore consequuntur laborum voluptates ea voluptate eligendi in eum sequi aperiam quia, iste sapiente impedit soluta!
                        </p>
                    </div>
                </div>
                <div className="login-form-container">
                    {/* <h1>LOGIN</h1> */}
                    <LoginForm />
                </div>
            </div>
            <div className="footer">
                <div style={{ backgroundColor: "gray", opacity: "0.8", height: "100%", width: "100%" }}></div>
                <p>©️ {new Date().getFullYear()} All rights reserved</p>
            </div>
        </div>
    )
}

export default Login
