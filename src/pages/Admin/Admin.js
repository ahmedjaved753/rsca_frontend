import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Button, Switch, message } from 'antd'
import Modal from 'react-modal'
import Input from '../../components/Inputbox/Inputbox';
import useFormData from '../../hooks/useFormData'
import Menu from '../../components/Menu/Menu'
import UsersList from '../../components/UsersList/UsersList'
import UserDetails from '../../components/UserDetails/UserDetails'
import { getAccessAuthHeader } from '../../helpers/localStorage'
import { matchPasswords, passwordIsCorrect } from '../../helpers/formValidation'
import { AiFillPlusCircle } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { USERS, REGISTER_BY_ADMIN } from '../../routes';
import './admin.css'

function Admin() {

    const [users, setUsers] = useState([]);
    const [userIsClicked, setUserIsClicked] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const usersRef = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [formData, handleOnchange, changeToDefault] = useFormData({ username: "", email: "", password: "", confirmPassword: "", userType: "VW" })
    const [loading, setLoading] = useState(false);
    const [newUserAdded, setNewUserAdded] = useState(0);

    useEffect(() => {
        axios.get(USERS, { headers: getAccessAuthHeader() })
            .then(res => {
                setUsers(res.data)
                usersRef.current = res.data;
                console.log(res.data);
            })
            .catch(console.log)
    }, [newUserAdded])

    function handleOnSubmit(e) {
        e.preventDefault()
        const { username, email, password, confirmPassword, userType } = formData;
        if (!matchPasswords(password, confirmPassword)) {
            message.error("Both passwords don't match");
            return;
        }
        if (!passwordIsCorrect(password)) {
            message.error("Password must contain one uppercase, one lowercase, one number and must be of length 8 to 25");
            return;
        }
        setLoading(true);
        console.log(formData);
        axios.post(REGISTER_BY_ADMIN, { username, email, password, "user_type": userType }, { headers: getAccessAuthHeader() })
            .then(response => {
                setLoading(false);
                console.log(response);
                console.log(response.data);
                message.success("User Added successfully!")
                setModalIsOpen(false);
                changeToDefault();
                setNewUserAdded(ov => ov + 1)
            })
            .catch((error) => {
                setLoading(false);
                console.log("error aaya");
                console.log(error);
                console.log(error.response);
                changeToDefault()
            })

    }

    return (
        <div className="admin-container">
            <Menu />
            <UsersList users={users} usersRef={usersRef} setUsers={setUsers} setUserIsClicked={setUserIsClicked} setCurrentUser={setCurrentUser} />
            <div className="verticle-line">
            </div>
            {userIsClicked && <UserDetails setUsers={setUsers} user={currentUser} />}
            <AiFillPlusCircle onClick={() => setModalIsOpen(true)} style={{ position: 'fixed', bottom: "5vh", right: "5vw", width: "5em", height: "5em", color: "#5F2EEA", cursor: 'pointer' }} />
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={{
                overlay: {},
                content: {
                    width: "30vw",
                    height: "70vh",
                    margin: "0 auto",
                    border: "1px solid #00ba88"
                }
            }}>
                <form className="modal-form" onSubmit={handleOnSubmit}>
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
                    <div>
                        <select name="userType" onChange={handleOnchange} className="select-input-styles input-styles">
                            <option value="VW">Viewer</option>
                            <option value="CR">Creator</option>
                            <option value="AD">Admin</option>
                        </select>
                        <Switch defaultChecked className="switch" />
                    </div>
                    <Button htmlType="submit" loading={loading} style={{ justifySelf: "center", backgroundColor: "#5F2EEA", paddingRight: "30px", paddingLeft: "30px", }} type="primary" shape="round" size="large">
                        Create
            </Button>
                </form>
            </Modal>
        </div>
    )
}

export default Admin
