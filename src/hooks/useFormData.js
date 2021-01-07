import { useState } from 'react'

export default function useFormData(initialState) {
    const [formData, setFormData] = useState(initialState);
    function handleOnchange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return [formData, handleOnchange];
}