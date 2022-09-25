const express = require('express');
const router = express.Router();
const {
	registerUser,
	userLogin,
	getMe,
} = require('../controllers/userController');
const authenticateRoutes = require('../middleware/authMiddleware');

router.route('/').post(registerUser);
router.route('/login').post(userLogin);
router.route('/me').get(authenticateRoutes, getMe);

module.exports = router;
