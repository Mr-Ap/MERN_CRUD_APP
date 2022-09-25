const express = require('express');
const router = express.Router();
const {
	getGoals,
	createGoal,
	editGoal,
	deleteGoal,
} = require('../controllers/goalControllers');

router.route('/').get(getGoals).post(createGoal);
router.route('/:id').put(editGoal).delete(deleteGoal);

module.exports = router;
