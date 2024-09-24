import { createSlice } from "@reduxjs/toolkit";
import { getAllRecipes, getRecipeByID, searchRecipes, getRecipesByCategory } from "./recipesAPI";
import { revertAll } from '../user/userAPI';

const initialState = {
    recipesArray: [],
    loading: false,
    error: null
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        resetRecipesState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.recipesArray = action.payload;
            })
            .addCase(getAllRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getRecipesByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecipesByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.recipesArray = action.payload;
            })
            .addCase(getRecipesByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getRecipeByID.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecipeByID.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.recipesArray = [action.payload];
            })
            .addCase(getRecipeByID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.recipesArray = action.payload;
            })
            .addCase(searchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(revertAll, () => initialState)
    }
});

export default recipesSlice.reducer;
export const { resetRecipesState } = recipesSlice.actions;