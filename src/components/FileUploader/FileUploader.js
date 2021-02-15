import React, { useState } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import { Upload, Progress, Alert } from "antd";
import { getAccessToken } from '../../helpers/localStorage'
import { UPLOAD_FILE } from '../../helpers/routes'
import './file-uploader.css'

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
            "Bearer " + getAccessToken();
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
            const res = await axios.post(UPLOAD_FILE, fmData, config);

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
        <div className="outer-container" id="outer-container-id">
            {titleError ? (
                <Alert
                    message="Error"
                    description="Title cannot be empty."
                    type="error"
                    showIcon
                />
            ) : null}
            <h1>Add New Post</h1>
            <textarea
                type="text"
                placeholder="Enter title"
                value={title}
                style={{borderRadius:"0.3rem"}}
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
                    {defaultFileList.length >= 1 ? null : <div>Upload</div>}
                </Upload>
                {progress > 0 ? <Progress percent={progress} /> : null}
            </div>
        </div>
    );
}

export default FileUploader;