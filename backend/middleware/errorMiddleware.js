//Written a custom midllerware that will handles errors if there are any and overide the message

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === '400' ? res.statusCode : 500;

	res.status(statusCode);
	res.json({
		message: `Something went wrong, please try again..! ${err.message}`,
		stack: process.env === 'production' ? null : err.stack,
	});
};

module.exports = { errorHandler };
