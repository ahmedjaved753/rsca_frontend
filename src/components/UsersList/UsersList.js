import { v4 as uuid } from 'uuid';
import { Input } from 'antd';
import { RiSearchLine } from "react-icons/ri";
import './users-list.css'
import User from '../User/User';

function UsersList({ users, setUserIsClicked, setCurrentUser, setUsers, usersRef }) {

    const usersList = users.map(user => <User setUserIsClicked={setUserIsClicked} setCurrentUser={setCurrentUser} key={uuid()} user={user} />)
    function onChangeHandler(e) {
        setUsers(usersRef.current.filter(user => user.username.includes(e.target.value)))
    }

    return (
        <div className="usersList-container">
            <div className="input-container">
                <Input onChange={onChangeHandler} size="large" className="input-styles" placeholder="Search" prefix={<RiSearchLine />} />
            </div>
            <div className="list-container">
                {usersList}
            </div>
        </div>
    )
}

export default UsersList
