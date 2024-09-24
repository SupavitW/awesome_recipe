import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';


export const createUser = createAsyncThunk('signUp/createUser', async (userInput, { rejectWithValue }) => {
    // Make a POST req to create user in database
    try {
        const response = await axiosInstance.post('http://localhost:8000/register', userInput, {
        headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
        return response.data;
    } catch(error) {
        // return error message from API
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Login Failure')
        }
    }
});
