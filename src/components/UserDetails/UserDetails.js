import React, { useState } from 'react'
import axios from 'axios'
import { Input, Switch, Button } from 'antd';
import { FaKey } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import useFormData from '../../hooks/useFormData';
import { USER_DETAILS } from '../../routes';
import { getAccessAuthHeader } from '../../helpers/localStorage'
import './user-details.css';

function UserDetails({ user, setUsers }) {
    const [formData, handleOnchange] = useFormData({ password: "", userType: "VW" });
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const inputClassName = "input-styles top-margin";

    function onDelete() {
        setDeleteLoading(true);
        axios.delete(`${USER_DETAILS}${user.id}/`, { headers: getAccessAuthHeader() })
            .then(res => {
                setUsers(oldUsers => oldUsers.filter(usr => usr.id !== user.id))
                setDeleteLoading(false);
            })
            .catch(error => {
                console.log(error)
                setDeleteLoading(false);
            })
    }

    function onSave() {
        setSaveLoading(true)
        axios.put(`${USER_DETAILS}${user.id}/`, { password: formData.password, user_type: formData.userType, username: user.username, email: user.email }, { headers: getAccessAuthHeader() })
            .then(res => {
                setSaveLoading(false)
            })
            .catch(error => {
                console.log(error);
                setSaveLoading(false)
            })
    }
    return (
        <div className="user-details-container">
            <form className="user-details-form">
                <Input size="large" value={user.username} readOnly className={inputClassName} prefix={<FaRegUser />} />
                <Input size="large" value={user.email} readOnly className={inputClassName} prefix={<FaRegEnvelope />} />
                <Input value={formData.password} onChange={handleOnchange} size="large" className={inputClassName} placeholder="Password" name="password" prefix={<FaKey />} />
                <div>
                    <select name="userType" onChange={handleOnchange} className={`${inputClassName} select-input-styles`} value={user.user_type}>
                        <option value="VW">Viewer</option>
                        <option value="CR">Creator</option>
                        <option value="AD">Admin</option>
                    </select>
                    <Switch defaultChecked className="switch" />
                </div>
                <Button onClick={onSave} loading={saveLoading} style={{ alignSelf: "center", backgroundColor: "#5F2EEA", paddingRight: "30px", paddingLeft: "30px", display: "block", justifySelf: "center", marginTop: "0.5em" }} type="primary" shape="round" size="large">
                    Save
                </Button>
                <Button onClick={onDelete} loading={deleteLoading} style={{ alignSelf: "center", backgroundColor: "red", paddingRight: "30px", paddingLeft: "30px", justifySelf: "center", marginTop: "0.5em" }} type="primary" shape="round" size="large">
                    Delete
                </Button>
            </form>
        </div>
    )
}

export default UserDetails
