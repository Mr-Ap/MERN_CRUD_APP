import axios from 'axios';

const goalBaseURLs = '/api/goals';

const getGoals = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const newGoal = await axios.get(goalBaseURLs + '/', config);
	return newGoal.data;
};

const createGoal = async (goal, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const newGoal = await axios.post(goalBaseURLs + '/', goal, config);
	return newGoal.data;
};

const deleteGoal = async (goalId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const newGoal = await axios.delete(goalBaseURLs + `/${goalId}`, config);
	return newGoal.data;
};

export const goalService = {
	getGoals,
	createGoal,
	deleteGoal,
};
