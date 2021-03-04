import React from "react";
import FileUploader from "../../components/FileUploader/FileUploader";
import Navbar from "../../components/Navbar/Navbar";
import "./home.css";

function Home({ userType }) {
  return (
    <div className="home-container">
      <Navbar />
      <div className="file-uploader-container">
        {(userType === "CR" || userType === "AD") ? <FileUploader /> : null}
      </div>
    </div>
  );
}

export default Home;
