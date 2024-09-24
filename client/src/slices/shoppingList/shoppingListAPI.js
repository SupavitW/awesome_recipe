import { createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';

export const getShoppingList = createAsyncThunk('shoppingList/getShoppingList', async (_, { rejectWithValue }) => {
    // Make a GET request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_SHOPPINGLIST;
        console.log('targetURL: ', targetURL)
        const response = await axiosInstance.get(targetURL, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.data.msg === "User's shopping list is empty.") return [];
        return response.data.ingredients;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Fetch shopping list Failure')
        }
    }
});

export const addToShoppingList = createAsyncThunk('shoppingList/addToShoppingList', async (ingredientInfo, { rejectWithValue }) => {
    // Make a POST request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_INGREDIENTS + `/addToShoppingList/${ingredientInfo.id}`;
        const response = await axiosInstance.post(targetURL, {
            unit: ingredientInfo.unit,
            quantity: ingredientInfo.quantity
        }, {
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
            return rejectWithValue('Add to shopping list Failure')
        }
    }
});

export const addAllToShoppingList = createAsyncThunk('shoppingList/addAllToShoppingList', async (recipeId, { rejectWithValue }) => {
    // Make a POST request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + `/addAllToShoppingList/${recipeId}`;
        const response = await axiosInstance.post(targetURL, {
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
            return rejectWithValue('Add all to shopping list Failure')
        }
    }
});

export const deleteFromShoppingList = createAsyncThunk('shoppingList/deleteFromShoppingList', async (intgredientId, { rejectWithValue }) => {
    // Make a DELETE request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_SHOPPINGLIST + `/remove/${intgredientId}`;
        const response = await axiosInstance.delete(targetURL, {
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
            return rejectWithValue('Delete from shopping list Failure')
        }
    }
});

export const clearShoppingList = createAsyncThunk('shoppingList/clearShoppingList', async (_, { rejectWithValue }) => {
    // Make a DELETE request
    try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_SHOPPINGLIST + '/removeAll';
        const response = await axiosInstance.delete(targetURL, {
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
            return rejectWithValue('Clear shopping list Failure')
        }
    }
});
