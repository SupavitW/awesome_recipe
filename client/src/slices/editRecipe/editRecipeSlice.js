import { createSlice } from '@reduxjs/toolkit';
import { editRecipe } from './editRecipeAPI';
import { revertAll } from '../user/userAPI';

const initialState = {
   editRecipeResponse: {},
   success: false,
   loading: false,
   error: '',
};

const editRecipeSlice = createSlice({
    name: 'editRecipe',
    initialState,
    reducers: {
        resetEditRecipeState: () => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(editRecipe.pending, (state) => {
            state.loading = true;
        })
        .addCase(editRecipe.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.editRecipeResponse = action.payload;
        })
        .addCase(editRecipe.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
        .addCase(revertAll, () => initialState)
    }
});

export default editRecipeSlice.reducer;
export const { resetEditRecipeState } = editRecipeSlice.actions;