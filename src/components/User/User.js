import React from 'react'
import './user.css'

function User({ user, setUserIsClicked, setCurrentUser }) {

    return <button className="user-button" onClick={() => { setUserIsClicked(true); setCurrentUser(user) }} >{user.username}</button>
}

export default User
