import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axios.get(`${process.env.REACT_APP_ROOT}/current_user`, {
        withCredentials: true
    })
    return response
})

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_ROOT}/logout`, {
            withCredentials: true
        })
        return response
    } catch (error) {
        console.log(error.message)
    }
})

export const singupUser = createAsyncThunk('user/signup', async (data) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_ROOT}/completeSetup`, data)
        return response
    } catch (err) {
        console.log(err.message)
    }
})

export const getEmployeesByBusiness = createAsyncThunk('user/getEmployeesByBusiness', async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_ROOT}/myEmployees`, data)
        return response
    } catch (err) {
        console.log(err)
    }
})

export const employeeSalary = createAsyncThunk('user/employeeSalary', async (data) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_ROOT}/setSalary`, data)
        return response
    } catch (err) {
        console.log(err)
    }
})

export const removeEmployee = createAsyncThunk('user/removeEmployee', async (data) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_ROOT}/employee/remove`, {
            data
        })
        return response
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    user: {},
    isLoading: false,
    isAuthenticated: false,
    employees: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.isLoading = true
            state.isAuthenticated = false
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isAuthenticated = action.payload?.data.isAuthenticated
            state.user = action.payload?.data.data
        },
        [fetchUser.rejected]: (state) => {
            state.isLoading = false
            state.isAuthenticated = false
        },
        [singupUser.pending]: (state) => {
            state.isLoading = true
        },
        [singupUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload?.data.data
        },
        [singupUser.rejected]: (state) => {
            state.isLoading = false
            state.isAuthenticated = false
        },
        [getEmployeesByBusiness.pending]: (state) => {
            state.isLoading = true
        },
        [getEmployeesByBusiness.fulfilled]: (state, action) => {
            state.isLoading = false
            state.employees = action.payload?.data
        },
        [getEmployeesByBusiness.rejected]: (state) => {
            state.isLoading = false
        },
        [employeeSalary.pending]: (state) => {
            state.isLoading = true
        },
        [employeeSalary.fulfilled]: (state, action) => {
            state.isLoading = false
            state.employees = action.payload?.data
        },
        [employeeSalary.rejected]: (state) => {
            state.isLoading = false
        },
        [removeEmployee.pending]: (state) => {
            state.isLoading = true
        },
        [removeEmployee.fulfilled]: (state, action) => {
            state.isLoading = false
            state.employees = action.payload?.data
        },
        [removeEmployee.rejected]: (state) => {
            state.isLoading = false
        },
        [logoutUser.pending]: (state) => {
            state.isLoading = true
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = {}
            state.isAuthenticated = action.payload.data?.isAuthenticated
        },
        [logoutUser.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export default userSlice.reducer
