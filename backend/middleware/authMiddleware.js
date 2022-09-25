const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateRoutes = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//get the token part from authorization header
			token = req.headers.authorization.split(' ')[1];

			const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
			req.user = await User.findById(decodedToken.id).select('id');
			next();
		} catch (error) {
			res.status(401);
			throw new Error('Not authorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized as no token found');
	}
});

module.exports = authenticateRoutes;
