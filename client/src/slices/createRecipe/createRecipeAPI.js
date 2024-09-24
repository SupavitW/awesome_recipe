import { createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';

export const createRecipe = createAsyncThunk('createRecipe/createRecipe', async (formData, { rejectWithValue }) => {
    // Make a POST request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + '/createRecipe';
        const response = await axiosInstance.post(targetURL, formData, {
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