import axios from 'axios';

export const submitLogin = async (formData) => {
    const response = await axios.post(`${import.meta.VITE_API_URL}/auth`, formData);
    localStorage.setItem('token', response.data.token);
    return response;
};