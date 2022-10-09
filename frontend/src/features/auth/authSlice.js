import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authServices } from '../../services/authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	data: user ? user : null,
	message: '',
	isLoading: false,
	isError: false,
	isSuccess: false,
};

export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authServices.registerUser(user);
		} catch (error) {
			const msg =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authServices.login(user);
	} catch (error) {
		const msg =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(msg);
	}
});

export const logOut = createAsyncThunk('auth/logout', async () => {
	await authServices.logOut();
});

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
				state.data = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
				state.data = null;
			})
			.addCase(logOut.fulfilled, (state) => initialState);
	},
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
