import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from '../user/userAPI';
import { getMyRecipes } from "./myRecipesAPI";

const initialState = {
    myRecipes: [],
    loading: false,
    error: null
};

const myRecipes = createSlice({
    name: 'myRecipes',
    initialState,
    reducers: {
        resetMyRecipesState: () => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMyRecipes.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getMyRecipes.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.myRecipes = action.payload;
        })
        .addCase(getMyRecipes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(revertAll, () => initialState)
    }
});

export const { resetMyRecipesState } = myRecipes.actions;
export default myRecipes.reducer;