import { createSlice } from '@reduxjs/toolkit';
import { createUser } from './signUpAPI'
import { revertAll } from '../user/userAPI';

const initialState = {
   signUpResponse: {},
   success: false,
   loading: false,
   error: '',
};

const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        resetSignupState (state) {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.signUpResponse = action.payload;
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
        .addCase(revertAll, () => initialState)
    }
});


export default signUpSlice.reducer;
export const { resetSignupState } = signUpSlice.actions;
