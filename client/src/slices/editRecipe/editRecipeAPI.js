import { createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';

export const editRecipe = createAsyncThunk('editRecipe/editRecipe', async ({formData, recipeID}, { rejectWithValue }) => {
    // Make a POST request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + `/myRecipes/editRecipe/${recipeID}`;
        const response = await axiosInstance.put(targetURL, formData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.Error) {
            return rejectWithValue(error.response.data.Error)
        } else {
            return rejectWithValue('Create recipe Failure')
        }
    }
});