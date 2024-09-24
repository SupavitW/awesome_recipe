import { createSlice } from "@reduxjs/toolkit";
import { getShoppingList, deleteFromShoppingList, addAllToShoppingList} from "./shoppingListAPI";
import { revertAll } from '../user/userAPI';

const initialState = {
    items: [],
    loading: false,
    error: null
};

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        resetShoppingListState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShoppingList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getShoppingList.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload || [];
            })
            .addCase(getShoppingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteFromShoppingList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFromShoppingList.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteFromShoppingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addAllToShoppingList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAllToShoppingList.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addAllToShoppingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(revertAll, () => initialState)
    }
})

export default shoppingListSlice.reducer;
export const { resetShoppingListState } = shoppingListSlice.actions;