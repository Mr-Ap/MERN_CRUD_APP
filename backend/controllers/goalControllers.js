const asyncHandler = require('express-async-handler');

//@desc GET goals
//@route GET /api/goals
//@access Private

const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get Goals' });
});

//@desc POST goal
//@route POST /api/goal
//@access Private

const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add required fields...!');
	}
	res.status(200).json({ message: 'Post Goals' });
});

//@desc PUT goals
//@route PUT /api/goal/id
//@access Private

const editGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Edit Goals of Id : ${req.params.id}` });
});

//@desc DELETE goals
//@route DELETE /api/goal/id
//@access Private

const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete Goals of Id : ${req.params.id}` });
});

module.exports = { getGoals, createGoal, editGoal, deleteGoal };
