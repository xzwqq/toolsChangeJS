import { createAction, createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
	name: 'form',
	initialState: {
		error: null,
		response: null
	},
	reducers: {
		submitFormSuccess: (state, action) => {
			state.response = action.payload;
		},
		submitFormFailure: (state, action) => {
			state.error = action.payload;
		}
	}
});

export const FormActions = { ...formSlice.actions,
	submit: createAction(`${formSlice.name}/submit`),
 };

export default formSlice.reducer;
