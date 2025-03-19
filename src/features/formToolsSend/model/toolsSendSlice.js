import { createSlice, createAction } from '@reduxjs/toolkit';

const toolsSendSlice = createSlice({
	name: 'toolsSend',
	initialState: {
		selectC: [],
		selectM: [],
		response: [],
		error: null,
		container: [],
	},
	reducers: {
		setSuccess: (state, action) => {
			state.response = action.payload;
		},
		setSelectC: (state, action) => {
			state.selectC = action.payload;
		},
		setSelectM: (state, action) => {
			state.selectM = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setContainer: ( state,action) =>{
			state.container = action.payload
		}
	}
});
export const ToolsSendActions = {
	...toolsSendSlice.actions,
	submit: createAction(`${toolsSendSlice.name}/submit`),
	submitSelectC: createAction(`${toolsSendSlice.name}/submitSelectC`),
	submitSelectM: createAction(`${toolsSendSlice.name}/submitSelectM`),
	submitContainer: createAction(`${toolsSendSlice.name}/submitContainer`),
	submitDelete: createAction(`${toolsSendSlice.name}/submitDelete`),
};
export default toolsSendSlice.reducer;
