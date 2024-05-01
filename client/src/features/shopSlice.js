import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createShop = createAsyncThunk('shop/createShop', async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_ROOT}/add-shop`, data)
    return response
})

export const getAllShops = createAsyncThunk('shop/getAllShops', async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_ROOT}/shops`, data)
    return response
})

export const searchShop = createAsyncThunk('shop/searchShop', async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_ROOT}/searchShop`, data)
    return response
})

const initialState = {
    shops: [],
    shop: {},
    isLoading: false,
    searchedShop: {}
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    extraReducers: {
        [createShop.pending]: (state) => {
            state.isLoading = true
        },
        [createShop.fulfilled]: (state, action) => {
            state.isLoading = false
        },
        [createShop.rejected]: (state) => {
            state.isLoading = false
        },
        [getAllShops.pending]: (state) => {
            state.isLoading = true
        },
        [getAllShops.fulfilled]: (state, action) => {
            state.isLoading = false
            state.shops = action.payload?.data.data
        },
        [getAllShops.rejected]: (state) => {
            state.isLoading = false
        },
        [searchShop.pending]: (state) => {
            state.isLoading = true
        },
        [searchShop.fulfilled]: (state, action) => {
            state.isLoading = false
            state.searchedShop = action.payload?.data.data
        },
        [searchShop.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export default shopSlice.reducer
