import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTrendingMovies = createAsyncThunk('get/trending_all', async ({type}) => {
    return fetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`).then ((res) => res.json())
});

const trendingMoviesSlice = createSlice({
    name : "trending_movies",
    initialState : {
        list : [],
        status : null,
    },
    extraReducers : {
        [getTrendingMovies.pending] : (state, action) => {
            state.status = "loading"
        },
        [getTrendingMovies.fulfilled] : (state, action) => {
            state.list = action.payload;
            state.status = 'success'
        },
        [getTrendingMovies.rejected] : (state, action) => {
            state.status = 'failed'
        },
    },
});

export default trendingMoviesSlice.reducer;