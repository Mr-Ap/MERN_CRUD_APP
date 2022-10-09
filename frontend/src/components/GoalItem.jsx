import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

function GoalItem({ goal }) {
	const dispatch = useDispatch();
	return (
		<div className='goal'>
			<div>Date : {new Date(goal.createdAt).toLocaleDateString('en-US')}</div>
			<h2>{goal.text}</h2>

			<section>
				<button
					onClick={() => dispatch(deleteGoal(goal._id))}
					className='close'
				>
					X
				</button>
			</section>
		</div>
	);
}

export default GoalItem;
