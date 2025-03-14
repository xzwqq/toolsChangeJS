import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToolsSendActions } from '../model/toolsSendSlice.js';

const FormToolsSend = () => {
	const token = localStorage.getItem('token');
	const dispatch = useDispatch();
	const toolSelected = useSelector(state => state.toolsSend.selectC);
	const manufacturers = useSelector(state => state.toolsSend.selectM);
	const [formData, setFormData] = useState({
		type: '',
		condition: '',
		price: '',
		categoryId: '',
		manufacturerId: '',
		description: '',
		files: null
	});

	const $api = axios.create({
		headers: {
			authorization: `Bearer ${token}`
		}
	});

	const submitForm = async (e) => {
		e.preventDefault();
	  
		const formData = new FormData();
		
		// Добавляем JSON как строку в formData
		const tool = {
		  type: formData.type,
		  condition: formData.condition,
		  price: formData.price,
		  categoryId: formData.categoryId,
		  manufacturerId: formData.manufacturerId,
		  description: formData.description
		};
		
		formData.append('tool', new Blob([JSON.stringify(tool)], { type: 'application/json' }));
		console.log(formData.files)
		
		// Добавляем файл
		if (formData.files) {
		  formData.append('files', formData.files);
		}
	  
		try {
		  const response = await $api.post('http://10.3.34.137:8080/api/v1/tools', formData, {
			headers: {
			  'Content-Type': 'multipart/form-data'
			}
		  });
	  
		  console.log(response.data);
		} catch (err) {
		  console.error(err);
		}
	  };

	const handleChange = e => {
		const { name, value, type, files } = e.target;
		console.log(value)
		setFormData(prev => ({
			...prev,
			[name]: type === 'file' ? files[0] : value 
			
		}));
	};

	useEffect(() => {
		dispatch(ToolsSendActions.submitSelectM());
		dispatch(ToolsSendActions.submitSelectC());
	}, [dispatch]);

	return (
		<>
			<form onSubmit={submitForm}>
				<select name='type' value={formData.type} onChange={handleChange}>
					<option value=''>Выберите тип</option>
					<option value='EXCHANGE'>Обмен</option>
					<option value='RENT'>Аренда</option>
					<option value='SALE'>продажа</option>
				</select>

				<select
					name='condition'
					value={formData.condition}
					onChange={handleChange}
				>
					<option value=''>Выберите состояние</option>
					<option value='USED'>б/у</option>
					<option value='NEW'>новое</option>
				</select>
				<select
					name='categoryId'
					value={formData.categoryId}
					onChange={handleChange}
				>
					<option value=''>Выберите инструмент</option>
					{toolSelected?.map(tools => {
						return (
							<option key={tools.id} value={tools.id}>
								{tools.name}
							</option>
						);
					})}
				</select>
				<select
					name='manufacturerId'
					value={formData.manufacturerId}
					onChange={handleChange}
				>
					<option value=''>Выберите производителя</option>
					{manufacturers?.map((manufacturer) => {
						return (
							<option key={manufacturer.id} value={manufacturer.id}>
								{manufacturer.name}
							</option>
						);
					})}
				</select>
				<input name='price' onChange={handleChange} type='text' />
				<input
					name='description'
					value={formData.description}
					type='text'
					onChange={handleChange}
				/>
				<input name='files' onChange={handleChange} type='file' />
				<button type='submit'>я лох</button>
			</form>
		</>
	);
};

export default FormToolsSend;
