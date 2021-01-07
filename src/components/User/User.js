import React from 'react'
import './user.css'

function User({ user, setUserIsClicked, setCurrentUser }) {

    return <button onClick={() => { setUserIsClicked(true); setCurrentUser(user) }} className="user-button">{user.username}</button>
}

export default User
