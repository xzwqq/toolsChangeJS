import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoading : true,
    errorNetwork: null,
}

const helperSlice = createSlice({
    name : 'helper',
    initialState,
    reducers : {
        setIsloadingSucsses: (state) =>{
            state.isLoading = false
        },
        setErrorNetwork: (state, action) =>{
            state.errorNetwork = action.payload
        } 
    }
})

export const HelperActions = {
    ...helperSlice.actions
}

export default helperSlice.reducer