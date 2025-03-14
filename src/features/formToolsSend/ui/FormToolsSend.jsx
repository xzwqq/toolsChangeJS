import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToolsSendActions } from '../model/toolsSendSlice.js';

const FormToolsSend = () => {
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
	});
	const [files, setFiles ] = useState()


	const submitForm = async e => {
		e.preventDefault();
		const data ={
			tool: formData,
			files,
		}

		dispatch(ToolsSendActions.submit(data))
	}

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({...prev,[name]:  value}));
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
					{manufacturers?.map(manufacturer => {
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
				<input name='files' onChange={(e)=> {
					setFiles(e.target.files[0])
					console.log(e.target.files[0]);
					
				}} type='file' />
				<button type='submit'>я лох</button>
			</form>
		</>
	);
};

export default FormToolsSend;
