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

router.get('/', getGoals);

router.post('/', createGoal);

router.put('/:id', editGoal);

router.delete('/:id', deleteGoal);

module.exports = router;
