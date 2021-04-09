import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PostsChart from '../../components/PostsChart'
import { Link } from 'react-router-dom'
import Costing from '../../components/svgs/Costing.png'
import Inventory from '../../components/svgs/Inventory.png'
import Planning from '../../components/svgs/Planning.png'
import Management from '../../components/svgs/Management.png'
import Search from '../../components/svgs/Search.png'
import Upload from '../../components/svgs/Upload.png'
import { authContext } from '../../contexts/AuthContext/AuthProvider'

import './landing.css'

function LandingPage() {

    const [userData, setUserData] = useState({});


    const { getUsersData } = useContext(authContext);

    useEffect(() => {
        getUsersData()
            .then(response => {
                setUserData(response.data);
                console.log(response.data, "ye wala asli")
            })
    }, [getUsersData])

    return (
        <div className="landing-container">
            <Navbar />
            <div className="landing-main-content">
                <div className="navigation-icons-container">
                    <Link className="nav-icon-link" to="/search">
                        <img className="icon-img" src={Search} alt="search-icon" />
                        <h1>Search</h1>
                    </Link>
                    <Link className="nav-icon-link" to="/">
                        <img className="icon-img" src={Upload} alt="upload-icon" />
                        <h1>Upload</h1>
                    </Link>
                    <Link className="nav-icon-link">
                        <img className="icon-img" src={Inventory} alt="inventory-icon" />
                        <h1>Inventory</h1>
                    </Link>
                    <Link className="nav-icon-link">
                        <img className="icon-img" src={Costing} alt="costing-icon" />
                        <h1>Costing</h1>
                    </Link>
                    <Link className="nav-icon-link">
                        <img className="icon-img" src={Planning} alt="planning-icon" />
                        <h1>Planning</h1>
                    </Link>
                    <Link className="nav-icon-link">
                        <img className="icon-img" src={Management} alt="management-icon" />
                        <h1>Management</h1>
                    </Link>
                </div>
                <div className="statistics-container">
                    <div>
                        <h1>Company: PUCIT</h1>
                    </div>
                    <div>
                        <h1>User: {userData.first_name}</h1>
                    </div>
                    <div>
                        <h1>Users: 3</h1>
                    </div>
                    <div>
                        <h1>Posts: 4</h1>
                    </div>
                    <div>
                        <PostsChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
