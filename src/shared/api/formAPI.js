import axios from 'axios';

export const submitForm = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData);
    localStorage.setItem('token', response.data.token);
    return response.data;
};