const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@desc POST registerUser
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please enter valid user data..!');
	}

	//check if user with given email already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists..!');
	}

	//encrypt the password
	const salt = await bcryptjs.genSalt(10);
	const encyptedPass = await bcryptjs.hash(password, salt);

	//create a new user
	const newUser = await User.create({
		name,
		email,
		password: encyptedPass,
	});

	if (newUser) {
		res.status(200).header('token', generateJWT(newUser._id)).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data..!');
	}
});

//@desc POST registerUser
//@route POST /api/users
//@access Public
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	//check if user exists
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error('User not found..!');
	}

	//user found, check password
	const decryptPass = await bcryptjs.compare(password, user.password);
	if (decryptPass) {
		res.header('token', generateJWT(user._id));
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentails..!');
	}
});

//@desc GET user details
//@route GET /api/users
//@access Private
const getMe = asyncHandler(async (req, res) => {
	const { name, email } = await User.findById(req.user.id);
	res.status(200).json({ name, email });
});

//generate a JWT
const generateJWT = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { registerUser, userLogin, getMe };
