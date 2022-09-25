const asyncHandler = require('express-async-handler');

//@desc POST registerUser
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	res.json({ message: 'Create a New User' });
});

//@desc POST registerUser
//@route POST /api/users
//@access Public
const userLogin = asyncHandler(async (req, res) => {
	res.json({ message: 'User Login' });
});

//@desc GET user details
//@route GET /api/users
//@access Public
const getMe = asyncHandler(async (req, res) => {
	res.json({ message: 'Get Me' });
});

module.exports = { registerUser, userLogin, getMe };
