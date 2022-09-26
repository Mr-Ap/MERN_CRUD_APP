import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log('passwords do not match');
			return;
		}
		console.log(formData);
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

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
