import { createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';

export const getMyRecipes = createAsyncThunk('myRecipes/getMyRecipes', async (_, { rejectWithValue }) => {
    // Make a GET request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + '/myRecipes';
        console.log('targetURL: ', targetURL)
        const response = await axiosInstance.get(targetURL, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Get user recipes Failure')
        }
    }
});