import React, { useState } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import { Upload, Progress, Alert } from "antd";

function FileUploader(props) {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [initalTitleError, setInitalTitleError] = useState(true);

    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);

    const beforeUpload = (file, fileList) => {
        console.log("before upload");
        if (title === "") {
            setTitleError(true);
            return false;
        }
        setTitleError(false);
        return true;
    };
    const uploadFile = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;
        //this hardcoded stuff should be changed {
        const accessToken =
            "Bearer " +
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEwMzc0OTQ4LCJqdGkiOiJkZTE5ZDVjNDBmMmI0NDg4OWE0NmVmNjY5YzU4MDVhNiIsInVzZXJfaWQiOjF9.xUbRMLr3WXryjJ6gKq5LVut7nAeJjQ6fe_sjpRBMqs8";
        const uploadUrl = "http://localhost:8000/api/posts/upload/";
        const fmData = new FormData();
        // }
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: accessToken,
            },
            onUploadProgress: (event) => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            },
        };
        fmData.append("data_file", file);
        fmData.append("title", title);
        try {
            const res = await axios.post(uploadUrl, fmData, config);

            onSuccess("Ok");
            console.log("server res: ", res);
        } catch (err) {
            console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };

    const handleOnChange = ({ file, fileList, event }) => {
        setDefaultFileList(fileList);
    };
    return (
        <div>
            {titleError ? (
                <Alert
                    message="Error"
                    description="Title cannot be empty."
                    type="error"
                    showIcon
                />
            ) : null}
            <h1>New Post</h1>
            <textarea
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => {
                    setInitalTitleError(false);
                    if (e.target.value === "") {
                        setTitleError(true);
                    } else {
                        setTitleError(false);
                    }
                    setTitle(e.target.value);
                }}
            />

            <div className="container">
                <Upload
                    type="file"
                    accept="file/*,.enc"
                    customRequest={uploadFile}
                    onChange={handleOnChange}
                    listType="picture-card"
                    defaultFileList={defaultFileList}
                    className="image-upload-grid"
                    disabled={titleError || initalTitleError}
                    beforeUpload={beforeUpload}
                >
                    {defaultFileList.length >= 1 ? null : <div>Upload Button</div>}
                </Upload>
                {progress > 0 ? <Progress percent={progress} /> : null}
            </div>
        </div>
    );
}

export default FileUploader;