import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTrendingAll = createAsyncThunk('get/trending_all', async ({type}) => {
    return fetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`).then ((res) => res.json())
});

const trendingAllSlice = createSlice({
    name : "trending_all",
    initialState : {
        list : [],
        status : null,
    },
    extraReducers : {
        [getTrendingAll.pending] : (state, action) => {
            state.status = "loading"
        },
        [getTrendingAll.fulfilled] : (state, action) => {
            state.list = action.payload;
            state.status = 'success'
        },
        [getTrendingAll.rejected] : (state, action) => {
            state.status = 'failed'
        },
    },
});

export default trendingAllSlice.reducer;