import React, { useState } from 'react'
import './input.css'
import { Input } from 'antd';


function Inputbox({ PrefixIcon, handleOnchange, ...props }) {
    const [hasFocus, setHasFocus] = useState(false);
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);
    const focusStyles = hasFocus ? { backgroundColor: "rgb(0, 186, 136, 0.15)", border: "1px solid #00ba88" } : {};
    return (
        <div className="input-container">
            <Input
                {...props}
                required
                style={{ height: '4em', borderRadius: "10px", ...focusStyles }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="inputbox" bordered={false} size="large" prefix={<PrefixIcon opacity={hasFocus ? 1 : 0.7} color={hasFocus ? "rgb(0, 186, 136)" : ""} />} />
        </div>
    )
}

export default Inputbox
