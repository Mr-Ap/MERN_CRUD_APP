import axios from 'axios';

const getEndpoints = (url = '/api/users') => ({
	registerUser: url + '/',
	login: url + '/login',
	about: url + '/me',
});

const registerUser = async (userData) => {
	const user = await axios.post(getEndpoints().registerUser, userData);
	if (user && user.data) {
		localStorage.setItem('user', JSON.stringify(user.data));
	}
	return user.data;
};

//login
const login = async (userData) => {
	const user = await axios.post(getEndpoints().login, userData);
	if (user && user.data) {
		localStorage.setItem('user', JSON.stringify(user.data));
	}
	return user.data;
};

//logout user
const logOut = async () => {
	await localStorage.removeItem('user');
};

export const authServices = {
	registerUser,
	login,
	logOut,
};
