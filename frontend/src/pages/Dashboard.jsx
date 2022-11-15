import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, goalActions } from '../features/goals/goalSlice';

function Dashboard() {
	const { data } = useSelector((state) => state.auth);
	const { goals, isError, isLoading, message } = useSelector(
		(state) => state.goals
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGoals());
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!data) navigate('/login');

		return () => {
			dispatch(goalActions.reset());
		};
	}, [data, dispatch, isError, message, navigate]);

	if (isLoading) return <Spinner />;

	return (
		<div>
			<section className='heading'>
				<h2>Hello, {data && data.name}</h2>
				<p>Goals Dashboard</p>
			</section>
			<GoalForm />
			<section className='content'>
				{goals.length > 0 ? (
					<div className='goals'>
						{goals.map((goal, index) => (
							<GoalItem key={index} goal={goal} />
						))}
					</div>
				) : (
					<>
						<h2>No goals Set!</h2>
						<p>Set your Goal right away!</p>
					</>
				)}
			</section>
		</div>
	);
}

export default Dashboard;
