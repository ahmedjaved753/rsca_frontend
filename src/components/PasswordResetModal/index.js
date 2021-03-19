import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { POST_PASSWORD_RESET_EMAIL } from '../../helpers/routes'

function PasswordResetModal({ modalIsOpen }) {

    const [email, setEmail] = useState("")
    function handleEmailSubmit(e) {
        console.log("send email", email);
        e.preventDefault();
        axios.post(POST_PASSWORD_RESET_EMAIL, { email })
            .then((res) => {
                console.log("Success", res)

            })
            .catch((err) => console.log)
    }
    return (
        <Modal isOpen={modalIsOpen}>
            <form onSubmit={handleEmailSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </Modal>
    )
}

export default PasswordResetModal
