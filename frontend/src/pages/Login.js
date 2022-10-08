import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (isSuccess && data) {
			navigate('/');
		}
	}, [data, isError, isSuccess, message, navigate, dispatch]);

	const { email, password } = formData;

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	if (isLoading) return <Spinner />;
	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Log In into Account</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='Enter your email'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type={'password'}
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Enter the password'
							onChange={onChange}
						/>
					</div>

					<div className='form-group'>
						<button className='btn btn-block' type='submit'>
							Login
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login;
