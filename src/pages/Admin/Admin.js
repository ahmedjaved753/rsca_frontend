import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Menu from '../../components/Menu/Menu'
import UsersList from '../../components/UsersList/UsersList'
import UserDetails from '../../components/UserDetails/UserDetails'
import { getAccessAuthHeader } from '../../helpers/localStorage'
import { AiFillPlusCircle } from "react-icons/ai";
import { USERS } from '../../routes';
import './admin.css'

function Admin() {

    const [users, setUsers] = useState([]);
    const [userIsClicked, setUserIsClicked] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axios.get(USERS, { headers: getAccessAuthHeader() })
            .then(res => {
                setUsers(res.data)
                console.log(res.data);
            })
            .catch(console.log)
    }, [])

    return (
        <div className="admin-container">
            <Menu />
            <UsersList users={users} setUserIsClicked={setUserIsClicked} setCurrentUser={setCurrentUser} />
            <div className="verticle-line">
            </div>
            {userIsClicked && <UserDetails setUsers={setUsers} user={currentUser} />}
            <AiFillPlusCircle style={{ position: 'fixed', bottom: "5vh", right: "5vw", width: "5em", height: "5em", color: "#5F2EEA", cursor: 'pointer' }} />
        </div>
    )
}

export default Admin
