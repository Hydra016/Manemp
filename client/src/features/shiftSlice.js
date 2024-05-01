import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const saveShifts = createAsyncThunk('shifts/saveShift', async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_ROOT}/shift/create`, data)
    return response
})

export const getShifts = createAsyncThunk('shifts/getShift', async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_ROOT}/shifts`, data)
    return response
})

export const getEmployeeShifts = createAsyncThunk('shifts/getEmployeeShifts', async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_ROOT}/employeeShifts`, data)
    return response
})

export const deleteShifts = createAsyncThunk('shifts/deleteShifts', async (data) => {
    const response = await axios.delete(`${process.env.REACT_APP_ROOT}/delete`, {
        data
    })
    return response
})

export const getSalaries = createAsyncThunk('shifts/monthlySalary', async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_ROOT}/MonthlySalary`, data)
    return response
})

export const getMonthlyHours = createAsyncThunk('shifts/getMonthlyHours', async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_ROOT}/monthlyHours`, data)
    return response
})

const initialState = {
    shifts: [],
    temporaryShifts: [],
    isLoading: false,
    currentSalary: 0,
    previousSalary: 0,
    monthlyHours: []
}

const shiftSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        storeTemporaryShifts: (state, action) => {
            state.temporaryShifts = action.payload
        }
    },
    extraReducers: {
        [saveShifts.pending]: (state) => {
            state.isLoading = true
        },
        [saveShifts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.shifts = action.payload?.data.data
        },
        [saveShifts.rejected]: (state) => {
            state.isLoading = false
        },
        [getShifts.pending]: (state) => {
            state.isLoading = true
        },
        [getShifts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.shifts = action.payload?.data.data
        },
        [getShifts.rejected]: (state) => {
            state.isLoading = false
        },
        [getEmployeeShifts.pending]: (state) => {
            state.isLoading = true
        },
        [getEmployeeShifts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.shifts = action.payload?.data.data
        },
        [getEmployeeShifts.rejected]: (state) => {
            state.isLoading = false
        },
        [deleteShifts.pending]: (state) => {
            state.isLoading = true
        },
        [deleteShifts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.shifts = action.payload?.data.data
        },
        [deleteShifts.rejected]: (state) => {
            state.isLoading = false
        },
        [getSalaries.pending]: (state) => {
            state.isLoading = true
        },
        [getSalaries.fulfilled]: (state, action) => {
            state.isLoading = false
            state.currentSalary = action.payload?.data.data.salaryCurrentMonth
            state.previousSalary = action.payload?.data.data.salaryPreviousMonth
        },
        [getSalaries.rejected]: (state) => {
            state.isLoading = false
        },
        [getMonthlyHours.pending]: (state) => {
            state.isLoading = true
        },
        [getMonthlyHours.fulfilled]: (state, action) => {
            state.isLoading = false
            state.monthlyHours = action.payload?.data.data
        },
        [getMonthlyHours.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const { storeTemporaryShifts } = shiftSlice.actions

export default shiftSlice.reducer
