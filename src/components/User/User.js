import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import './user.css'

function User({ user, setUserIsClicked, setCurrentUser }) {

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaUserAlt />
            <button className="user-button" onClick={() => { setUserIsClicked(true); setCurrentUser(user) }} >{user.username}</button>
        </div>
    )
}

export default User
