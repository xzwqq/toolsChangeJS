import { useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { RegisterActions } from '../model/registerSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const FormRegister = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const hasFetched = useRef(false);
	const authCode = params.get('code');
	const stateParam = params.get('state'); // Получаем state

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		login: '',
		lastname: '',
		firstname: '',
		password: ''
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(RegisterActions.submit(formData));
		
	};

	const loginGoogleLogin = e => {
		e.preventDefault();
		const clientId = '516154092590-oohtfj363v391j61f005jjgnbpb9jbb6.apps.googleusercontent.com';
		const redirectUri = 'http://localhost:5174/registration';
		const state = 'a2FsZmZsd2xmd2x3Zmx3ZmFhbGZ3bGZ3YWxmd2Fsd2FmbHdmYWw'; 
		const scope = 'openid profile email';

		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}&scope=${scope}`;
	};

	useEffect(() => {
		if (authCode && !hasFetched.current) {
			hasFetched.current = true; 
			axios.post(
					`${import.meta.env.VITE_API_URL}/openid?authCode=${authCode}&state=${stateParam}`
				)
				.then(response => {
					localStorage.setItem('token', response.data);
					console.log('Токен получен:', response.data);
					navigate('/');
				})
				.catch(error => {
					console.error('Ошибка авторизации:', error);
				});
		}
	}, [authCode, stateParam, navigate]);

	return (
		<div className='forms-register'>
			<form onSubmit={handleSubmit}>
				<div className='gmail'>
					<input
						type='email'
						name='login'
						onChange={handleChange}
						value={formData.login}
						required
						placeholder='Почта'
						maxLength='100'
						minLength='3'
					/>
				</div>
				<div className='surname'>
					<input
						type='text'
						name='lastname'
						onChange={handleChange}
						value={formData.lastname}
						required
						placeholder='Фамилия'
						minLength='3'
						maxLength='100'
					/>
				</div>
				<div className='name'>
					<input
						type='text'
						name='firstname'
						onChange={handleChange}
						value={formData.firstname}
						required
						placeholder='Имя'
						minLength='1'
						maxLength='100'
					/>
				</div>
				<div className='password'>
					<input
						type='password'
						name='password'
						onChange={handleChange}
						value={formData.password}
						required
						placeholder='Пароль'
						maxLength='100'
						minLength='3'
					/>
				</div>
				<div className='submit'>
					<input type='submit' value='Зарегистрироваться' />
				</div>
			</form>
			<button onClick={loginGoogleLogin}>Sign in with Google 🚀</button>
		</div>
	);
};

export default FormRegister;
