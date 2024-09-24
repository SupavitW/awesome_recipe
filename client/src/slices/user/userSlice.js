import { createSlice } from '@reduxjs/toolkit';
import { editProfile, fetchUser, logoutUser } from './userAPI';
import { revertAll } from './userAPI';

const initialState = {
   profile: {},
   loggedIn: false,
   loading: false,
   error: '',
   updateSuccessful: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetError (state) {
            state.error = ''
        },
        resetUpdateSuccessful (state) {
            state.updateSuccessful = false
        },
        logout (state) {
            state.loggedIn = false;
            state.profile = {}
        },
    },
    extraReducers: (builder) => {
        builder
        // fetchUser
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.loggedIn = true;
                state.profile = action.payload
                state.error = ''
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.profile = {}
                state.error = action.payload
            })
        // logoutUser
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.loggedIn = false;
                state.profile = {}
                state.error = ''
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        // editProfile
            .addCase(editProfile.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload !== null) state.profile = action.payload
                state.updateSuccessful = true
                state.error = ''
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(revertAll, () => initialState)
    }
});


export default userSlice.reducer;
export const {resetError, logout, resetUpdateSuccessful} = userSlice.actions;