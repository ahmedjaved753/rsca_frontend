import React, { useState, useEffect } from 'react'
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
    // eslint-disable-next-line
    const [formData, handleOnchange, _, setFormData] = useFormData({ password: "", userType: user.user_type, isActive: user.is_active });
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
        const body = {
            user_type: formData.userType, username: user.username, email: user.email, is_active: formData.isActive
        }
        if (formData.password !== "") body.password = formData.password;
        axios.put(`${USER_DETAILS}${user.id}/`, body, { headers: getAccessAuthHeader() })
            .then(res => {
                setSaveLoading(false)
            })
            .catch(error => {
                console.log(error);
                setSaveLoading(false)
            })
    }

    useEffect(() => {
        setFormData({ password: "", userType: user.user_type, isActive: user.is_active })
    }, [user, setFormData])
    return (
        <div className="user-details-container">
            <form className="user-details-form">
                <Input size="large" value={user.username} readOnly className={inputClassName} prefix={<FaRegUser />} />
                <Input size="large" value={user.email} readOnly className={inputClassName} prefix={<FaRegEnvelope />} />
                <Input value={formData.password} onChange={handleOnchange} size="large" className={inputClassName} placeholder="Password" name="password" prefix={<FaKey />} />
                <div>
                    <select name="userType" onChange={handleOnchange} className={`${inputClassName} select-input-styles`} value={formData.userType}>
                        <option value="VW">Viewer</option>
                        <option value="CR">Creator</option>
                        <option value="AD">Admin</option>
                    </select>
                    <Switch defaultChecked={formData.isActive} checked={formData.isActive} className="switch" onChange={v => setFormData({ ...formData, isActive: v })} />
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
