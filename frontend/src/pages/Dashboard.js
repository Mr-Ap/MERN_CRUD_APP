import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
	const { data } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (!data) navigate('/login');
	}, [data, navigate]);

	return <div>Dashboard</div>;
}

export default Dashboard;
