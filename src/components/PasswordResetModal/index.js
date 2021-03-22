import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { Button, message } from 'antd';
import { POST_PASSWORD_RESET_EMAIL, RESET_PASSWORD } from '../../helpers/routes'

Modal.setAppElement("#root")

function PasswordResetModal({ modalIsOpen, setModalIsOpen }) {

    const [codeSent, setCodeSent] = useState(false)
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [password, setpassword] = useState("")
    const [showEmailField, setShowEmailField] = useState(true)
    const [sendingTokenLoading, setSendingTokenLoading] = useState(false)
    const [passwordResettingLoading, setPasswordResettingLoading] = useState(false)
    function handleEmailSubmit(e) {
        setSendingTokenLoading(true)
        console.log("send email", email);
        e.preventDefault();
        axios.post(POST_PASSWORD_RESET_EMAIL, { email })
            .then((res) => {
                console.log("Success", res)
                setCodeSent(true)
                setShowEmailField(false)
                setSendingTokenLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setSendingTokenLoading(false)
                for (let msg in error.response.data) {
                    error.response.data[msg].forEach(m => message.error(msg + ": " + m));
                }
            })
    }

    function handlePasswordReset(e) {

        setPasswordResettingLoading(true)
        e.preventDefault()
        axios.post(RESET_PASSWORD, { email, "new-password": password, token })
            .then(res => {
                console.log(res, "password changed successfully");
                message.success("Password changed successfully!");
                setModalIsOpen(false)
                setPasswordResettingLoading(false)
            })
            .catch(error => {
                setPasswordResettingLoading(false)
                console.log(error);
                for (let msg in error.response.data) {
                    error.response.data[msg].forEach(m => message.error(msg + ": " + m));
                }
            })
    }
    return (
        <Modal
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={false}
            style={{
                overlay: {
                    display: 'grid',
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center"
                },
                content: {
                    margin: "0 auto",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "grid",
                    width: "50vw",
                    height: "50vh",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }}
            onRequestClose={() => setModalIsOpen(false)}>
            {showEmailField === true ? (<form onSubmit={handleEmailSubmit}>
                <h2>Enter your email</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button loading={sendingTokenLoading} htmlType="submit" style={{ alignSelf: "center", backgroundColor: "#5F2EEA", paddingRight: "10px", paddingLeft: "10px", display: "block", marginTop: "0.5em" }} type="primary" shape="round" size="large">
                    Submit
                </Button>
                {/* <button style={{ display: "block", backgroundColor: "#5F2EEA", justifySelf: "center", marginTop: "0.5em", }} type="submit">Submit</button> */}
            </form>) : null}
            {
                codeSent === true ? (
                    <form onSubmit={handlePasswordReset}>
                        <h2>Enter the token and new password</h2>
                        <div>
                            Token:
                            <input style={{ display: "block", marginBottom: "0.5rem" }} type="number" value={token} onChange={(e) => setToken(e.target.value)} />
                        </div>
                        <div>
                            Password:
                            <input style={{ display: "block", marginBottom: "0.5rem" }} type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        </div>
                        <Button loading={passwordResettingLoading} htmlType="submit" style={{ alignSelf: "center", backgroundColor: "#5F2EEA", paddingRight: "10px", paddingLeft: "10px", }} type="primary" shape="round" size="large">
                            Submit
                        </Button>
                        {/* <button style={{ display: "block", backgroundColor: "#5F2EEA" }} type="submit">Submit</button> */}
                    </form>
                ) : null
            }
        </Modal>
    )
}

export default PasswordResetModal
