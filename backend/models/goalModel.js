const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		text: {
			type: String,
			required: [true, 'Please add Text value'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Goal', goalSchema);
