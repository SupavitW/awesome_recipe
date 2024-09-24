import { createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';

export const getFavRecipes = createAsyncThunk('favoriteRecipes/getFavRecipes', async (_, { rejectWithValue }) => {
    // Make a GET request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_MYFAVRECIPES;
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
            return rejectWithValue('Get user favorite recipes Failure')
        }
    }
});

export const addToFav = createAsyncThunk('favoriteRecipes/addToFav', async (recipeID, { rejectWithValue }) => {
    // Make a POST request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + '/addToFav/' + recipeID;
        const response = await axiosInstance.post(targetURL, {
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
            return rejectWithValue('Add to user favorite recipes Failure')
        }
    }
});

export const removeFromFav = createAsyncThunk('favoriteRecipesBtn/removeFromFav', async (recipeID, { rejectWithValue }) => {
    // Make a POST request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_MYFAVRECIPES + '/unFavRecipe/' + recipeID;
        const response = await axiosInstance.delete(targetURL, {
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
            return rejectWithValue('Remove from user favorite recipes Failure')
        }
    }
});