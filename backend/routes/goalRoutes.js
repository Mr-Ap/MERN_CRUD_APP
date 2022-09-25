const express = require('express');
const router = express.Router();
const {
	getGoals,
	createGoal,
	editGoal,
	deleteGoal,
} = require('../controllers/goalControllers');
const authenticateRoutes = require('../middleware/authMiddleware');

router
	.route('/')
	.get(authenticateRoutes, getGoals)
	.post(authenticateRoutes, createGoal);
router
	.route('/:id')
	.put(authenticateRoutes, editGoal)
	.delete(authenticateRoutes, deleteGoal);

module.exports = router;
