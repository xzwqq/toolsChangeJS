import axios from 'axios';

const token = localStorage.getItem('token');
const $api = axios.create({
	headers: {
		authorization: `Bearer ${token}`
	}
});
export const getToolsCategories = async () => {
	const response = await $api.get(`${import.meta.env.VITE_API_URL}/categories`)
	return response.data;
};
export const getToolsManufacturers = async () => {
	const response = await $api.get(`${import.meta.env.VITE_API_URL}/manufacturers`)
	return response.data;
}

export const sendTools = async formdata => {
	await axios.post('', {
		formdata
	});
};
