import { useState, useRef,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LoginActions } from '../model/loginSlice.js';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import './login.scss';

const FormLogin = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const hasFetched = useRef(false);
	const authCode = params.get('code');
	const stateParam = params.get('state'); // Получаем state
	const navigate = useNavigate
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		login: '',
		password: ''
	});



	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(LoginActions.submit(formData));
	};
	const loginGoogleLogin = e => {
		e.preventDefault();
		const clientId =
			'516154092590-oohtfj363v391j61f005jjgnbpb9jbb6.apps.googleusercontent.com';
		const redirectUri = 'http://localhost:5174/registration';
		const state = 'a2FsZmZsd2xmd2x3Zmx3ZmFhbGZ3bGZ3YWxmd2Fsd2FmbHdmYWw'; // Можете использовать UUID
		const scope = 'openid profile email';

		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}&scope=${scope}`;
	};

	useEffect(() => {
		if (authCode && !hasFetched.current) {
			hasFetched.current = true; // Блокируем повторный вызов
			axios
				.post(
					`http://10.3.8.2:8080/api/v1/openid?authCode=${authCode}&state=${stateParam}`
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
		<>
			<div className='form-login'>
				<p className='login'>Вход</p>
				<form onSubmit={handleSubmit}>
					<div className='gmail'>
						<input
							className='gmail-input'
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
					<div className='password'>
						<input
							className='gmail-input'
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
					<div className='login-btn'>
						<button className='login-btn-input' onClick={handleSubmit}>
							Войти
						</button>
					</div>
				</form>
				<div className='after-form'>
					<div className='google-form'>
						<p>Или продолжить через:</p>
						<button onClick={loginGoogleLogin}>Sign in with Google 🚀</button>
					</div>
					<div className="regis">
						<p>Нету аккаунта?</p>
						<button>Зарегистрироваться</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default FormLogin;
