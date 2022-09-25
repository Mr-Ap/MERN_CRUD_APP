const express = require('express');
const router = express.Router();
const {
	registerUser,
	userLogin,
	getMe,
} = require('../controllers/userController');

router.route('/').post(registerUser);
router.route('/login').post(userLogin);
router.route('/me').get(getMe);

module.exports = router;
