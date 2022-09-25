//here we make a connection of our application with the Mongo DB in atlas

const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI);
		console.log(
			`Successfully connected with mongoDB ${connection.connection.host}`
		);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
