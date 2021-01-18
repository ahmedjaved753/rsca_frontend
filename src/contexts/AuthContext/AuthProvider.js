import React, { useState, createContext } from 'react'
import { useHistory } from "react-router-dom";
import { USER_INFO, REFRESH_TOKEN } from '../../helpers/routes';
import axios from 'axios'
import { getAccessAuthHeader, refreshLocalStorage, removeTokens, setTokensToLocalStorage, getRefreshToken, getAccessToken } from '../../helpers/localStorage'
export const authContext = createContext();

export function AuthProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const history = useHistory();
    function login(tokens) {
        setTokensToLocalStorage(tokens)
        console.log("acces after login", tokens.access);
        setIsAuthenticated(true);
        console.log("getting user type...");
        getAndSetUserType();
        history.push('/admin')
    }

    function logout() {
        if (isAuthenticated) {
            removeTokens();
            setIsAuthenticated(false);
            setUserType(null);
            history.push('/login')
        }
    }

    function refreshAccessToken() {

        return new Promise(function (resolve, reject) {
            if (localStorage.getItem('tokens')) {
                const refresh = getRefreshToken();
                axios.post(REFRESH_TOKEN, { refresh })
                    .then(response => {
                        console.log(response.data);
                        refreshLocalStorage(response.data.access);
                        resolve(response.data.access)
                    })
                    .catch(error => {
                        console.log("error aaya in refreshing token");
                        console.log(error);
                        logout();
                        history.push('/login')
                        reject(error)
                    })
            }
        })

    }

    function getAndSetUserType() {
        getUsersData()
            .then(response => setUserType(response.data.user_type))
            .catch(console.log)
    }

    function getUsersData() {
        return new Promise((resolve, reject) => {
            axios.get(USER_INFO, { headers: getAccessAuthHeader() })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status === 401) {
                        refreshAccessToken()
                            .then(() => {
                                axios.get(USER_INFO, { headers: getAccessAuthHeader() })
                                    .then(response => {
                                        console.log(response);
                                        resolve(response)
                                    })
                                    .catch(error => reject(error))
                            })

                    } else reject(error)
                })
        })
    }

    function init() {
        if (getAccessToken()) {
            setIsAuthenticated(true);
            getAndSetUserType();
        }
    }

    return (
        <authContext.Provider value={{ isAuthenticated, login, logout, userType, init, getUsersData, refreshAccessToken }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthProvider
