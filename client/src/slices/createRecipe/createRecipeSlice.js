import { createSlice } from '@reduxjs/toolkit';
import { createRecipe } from './createRecipeAPI';
import { revertAll } from '../user/userAPI';

const initialState = {
   createRecipeResponse: {},
   success: false,
   loading: false,
   error: '',
};

const createRecipeSlice = createSlice({
    name: 'createRecipe',
    initialState,
    reducers: {
        resetCreateRecipeState: () => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createRecipe.pending, (state) => {
            state.loading = true;
        })
        .addCase(createRecipe.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.createRecipeResponse = action.payload;
        })
        .addCase(createRecipe.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
        .addCase(revertAll, () => initialState)
    }
});

export default createRecipeSlice.reducer;
export const { resetCreateRecipeState } = createRecipeSlice.actions;