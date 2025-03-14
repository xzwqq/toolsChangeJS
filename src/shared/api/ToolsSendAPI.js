import axios from 'axios';

const token = localStorage.getItem('token');
const $api = axios.create({
	headers: {
		authorization: `Bearer ${token}`
	}
});
export const getToolsCategories = async () => {
	const response = await $api.get(`${import.meta.env.VITE_API_URL}/categories`);
	return response.data;
};
export const getToolsManufacturers = async () => {
	const response = await $api.get(
		`${import.meta.env.VITE_API_URL}/manufacturers`
	);
	return response.data;
};

export const sendTools = async (formdata) => {
	console.log(formdata)
	const response = await axios.post(`${import.meta.env.VITE_API_URL}/tools`, formdata, {
		headers: {
			authorization: `Bearer ${token}`,
			"Content-Type": 'multipart/form-data',
		}
	});	
	return response.data
};
