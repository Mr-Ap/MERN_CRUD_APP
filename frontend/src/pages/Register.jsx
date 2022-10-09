import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { register, authActions } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
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

	const { name, email, password, password2 } = formData;

	const onSubmit = (e) => {
		e.preventDefault();
		if (name.trim() === '' || email.trim() === '') {
			console.log('please Enter Creds');
			return;
		}
		if (password === '' || password !== password2) {
			console.log('passwords do not match');
			dispatch(authActions.reset());
			return;
		}
		dispatch(register({ name, email, password }));
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
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type={'text'}
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='Enter your name'
							onChange={onChange}
						/>
					</div>
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
						<input
							type={'password'}
							className='form-control'
							id='password2'
							name='password2'
							value={password2}
							placeholder='Confirm the password'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block' type='submit'>
							Register
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
