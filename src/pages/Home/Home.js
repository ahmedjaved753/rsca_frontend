import React from "react";
import FileUploader from "../../components/FileUploader/FileUploader";
import Menu from "../../components/Menu/Menu";
import "./home.css";

function Home({ userType }) {
  return (
    <div className="home-container">
      <Menu />
      <div className="file-uploader-container">
        {(userType === "CR" || userType === "AD") ? <FileUploader /> : null}
      </div>
    </div>
  );
}

export default Home;
