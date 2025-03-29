import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState ={
    container: [],
    error: '',
    isLoading: true,
}

const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setSuccses: (state, action) =>{
            state.container = action.payload
            state.isLoading = false
        },
        setError: (state, action) =>{
            state.error = action.payload
        }
    }
})

export const EditActions = {
    ...editSlice.actions,
    submitMyContainer: createAction(`${editSlice.name}/submitMyContainer`),
    submitGetContainer: createAction(`${editSlice.name}/submitGetContainer`),
}

export default editSlice.reducer