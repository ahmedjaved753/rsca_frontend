import React from 'react'
import FileUploader from '../../components/FileUploader/FileUploader'
import Menu from '../../components/Menu/Menu'
import './home.css'

function Home({ userType }) {
    return (
        <div className="home-container">
            <Menu />
            <div className="file-uploader-container">
                <FileUploader />
            </div>
        </div>
    )
}

export default Home
