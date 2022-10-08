import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, authActions } from '../features/auth/authSlice';

function Navbar() {
	const { data } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logOut());
		dispatch(authActions.reset());
		navigate('/login');
	};
	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>GoalSetter</Link>
			</div>
			<ul>
				{data ? (
					<li>
						<button className='btn' onClick={handleLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/login'>
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}

export default Navbar;
