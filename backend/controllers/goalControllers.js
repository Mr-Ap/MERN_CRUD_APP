const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//@desc GET goals
//@route GET /api/goals
//@access Private

const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ userId: req.user.id });
	res.status(200).json(goals);
});

//@desc POST goal
//@route POST /api/goal
//@access Private

const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add required fields...!');
	}
	const createdGoal = await Goal.create({
		text: req.body.text,
		userId: req.user.id,
	});
	res.status(200).json(createdGoal);
});

//@desc PUT goals
//@route PUT /api/goal/id
//@access Private

const editGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error('Goal with given Id is not found..!');
	}

	const user = await User.findById(req.user.id);
	//check if user is exists
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	//check if logged in user access its own goals

	if (user.id !== goal.userId.toString()) {
		res.status(401);
		throw new Error('user is not authorized');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(
		req.params.id,
		{
			text: req.body.text,
		},
		{ new: true }
	);
	res.status(200).json(updatedGoal);
});

//@desc DELETE goals
//@route DELETE /api/goal/id
//@access Private

const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error('Goal with given Id is not found..!');
	}
	const user = await User.findById(req.user.id);
	//check if user is exists
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	//check if logged in user access its own goals

	if (user.id !== goal.userId.toString()) {
		res.status(401);
		throw new Error('user is not authorized');
	}
	await goal.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, createGoal, editGoal, deleteGoal };
