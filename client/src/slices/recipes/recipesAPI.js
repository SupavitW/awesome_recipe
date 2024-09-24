import { createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';

export const getAllRecipes = createAsyncThunk('recipes/getAllRecipes', async (_, { rejectWithValue }) => {
    // Make a GET request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + '/getAllRecipes';
        const response = await axiosInstance.get(targetURL, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Fetch all recipes Failure')
        }
    }
});

export const getRecipeByID = createAsyncThunk('recipes/getRecipeByID', async (recipeID, { rejectWithValue }) => {
    // Make a GET request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + '/getRecipe/' + recipeID;
        const response = await axiosInstance.get(targetURL, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Fetch recipe by ID Failure')
        }
    }
});

export const getRecipesByCategory = createAsyncThunk('recipes/getRecipesByCategory', async (category, { rejectWithValue }) => {
    // Make a GET request
    try {
        const lowerCaseCategory = category.toLowerCase();
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + '/getRecipesByCategory/' + lowerCaseCategory;
        const response = await axiosInstance.get(targetURL, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Fetch recipes by category Failure')
        }
    }
});

export const searchRecipes = createAsyncThunk('recipes/searchRecipes', async (queryString, { rejectWithValue }) => {
    // Make a GET request
    try {
        // create a params string from query object
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + '/search?' + queryString;
        const response = await axiosInstance.get(targetURL, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Search recipes Failure')
        }
    }
});


