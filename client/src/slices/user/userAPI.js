import { createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/axiosInstance';
import { createAction } from "@reduxjs/toolkit";

export const revertAll = createAction('REVERT_ALL')

export const fetchUser = createAsyncThunk('user/fetchUser', async (userInput, { rejectWithValue }) => {
    // Make a POST request with data
    try {
        const response = await axiosInstance.post('http://localhost:8000/login', userInput, {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
        return response.data;
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Login Failure')
        }
    }
});

export const logoutUser = createAsyncThunk('user/logout', async ({ navigate },{ rejectWithValue, dispatch  }) => {
    try {
        const response = await axiosInstance.get('http://localhost:8000/logout', {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
        //reset the redux state (client side logout)
        if(response.status === 200 || response.status === 204) {
            dispatch(revertAll());
            navigate('/login'); // redirect to login page
        }
        return response;
    } catch (error) {
        if (error.response && error.response.data.msg) {
            return rejectWithValue(error.response.data.msg)
        } else {
            return rejectWithValue('Logout Failure')
        }
    }
});

export const editProfile = createAsyncThunk('user/editProfile', async ({userInput, option}, { rejectWithValue }) => {
    try {
        let response = null;
        if ( option === 'name') {
            response = await axiosInstance.put('http://localhost:8000/editProfile/name', userInput, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            })
            if (response.status === 200) {
                return response.data;
            }
        } else {
            response = await axiosInstance.put('http://localhost:8000/editProfile/password', userInput, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            })
            if (response.status === 200) {
                return null
            }
        }
    } catch (error) {
        if (error.response && error.response.data.Error ) {
            return rejectWithValue(error.response.data.Error)
        } else {
            return rejectWithValue('Edit Profile Failure')
        }
    }
});


