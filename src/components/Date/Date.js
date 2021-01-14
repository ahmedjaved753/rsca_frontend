import React from "react";
import { BsFilePost } from "react-icons/bs";
import { SiZeromq } from "react-icons/si";
import "./date.css";

function Date(props) {
    return (
        <div className="outerContainer">
            <p style={{ margin: "4px" }}>{props.dateNum}</p>
            <hr style={{ margin: "4px", opacity: "0.5", backgroundColor: "black" }} />
            <div className="lowerRow" style={{ pading: "4px" }}>
                {props.postCount > 0 ? (
                    <>
                        <BsFilePost color="#FF6584" opacity={0.8} />
                        <p style={{ margin: "-4px 0 0 0", opacity: "0.7" }}>
                            {props.postCount}
                        </p>
                    </>
                ) : (
                        <SiZeromq />
                    )}
            </div>
        </div>
    );
}

export default Date;