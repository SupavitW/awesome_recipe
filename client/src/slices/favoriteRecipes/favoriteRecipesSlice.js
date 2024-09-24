import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from '../user/userAPI';
import { getFavRecipes, addToFav, removeFromFav } from "./favoriteRecipesAPI";

const initialState = {
    favList: [],
    sucess: false,
    loading: false,
    error: null
};

const favoriteRecipes = createSlice({
    name: 'favoriteRecipes',
    initialState,
    reducers: {
        resetFavoriteRecipesState: () => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFavRecipes.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFavRecipes.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.sucess = true;
            state.favList = Object.keys(action.payload).length === 0 ? [] : action.payload;
        })
        .addCase(getFavRecipes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addToFav.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToFav.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            state.sucess = true;
        })
        .addCase(addToFav.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(removeFromFav.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromFav.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            state.sucess = true;
        })
        .addCase(removeFromFav.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(revertAll, () => initialState)
    }
});

export const { resetFavoriteRecipesState } = favoriteRecipes.actions;
export default favoriteRecipes.reducer;