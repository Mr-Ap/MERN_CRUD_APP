import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { goalService } from '../../services/goalService';

const initialState = {
	goals: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: '',
};

//create a goal
export const createGoal = createAsyncThunk(
	'goal/create',
	async (goal, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			return await goalService.createGoal(goal, token);
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

//get user Goals
export const getGoals = createAsyncThunk(
	'goal/getAllGoals',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			return await goalService.getGoals(token);
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

//delete a user Goal
export const deleteGoal = createAsyncThunk(
	'goal/deleteGoal',
	async (goalId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			return await goalService.deleteGoal(goalId, token);
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

const goalSlice = createSlice({
	name: 'goal',
	initialState: initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.goals.push(action.payload);
			})
			.addCase(createGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getGoals.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.goals = action.payload;
			})
			.addCase(getGoals.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.goals = [];
				state.message = action.payload;
			})
			.addCase(deleteGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.goals = state.goals.filter(
					(goal) => action.payload.id !== goal._id
				);
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default goalSlice.reducer;
export const goalActions = goalSlice.actions;
