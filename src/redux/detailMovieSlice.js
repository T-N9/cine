import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getDetailMovie = createAsyncThunk('get/detail_movie', async ({id}) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases`).then ((res) => res.json());
});

const detailMovieSlice = createSlice({
    name : "detail_movie",
    initialState : {
        list : [],
        status : null,
    },
    extraReducers : {
        [getDetailMovie.pending] : (state, action) => {
            state.status = "loading";
        },
        [getDetailMovie.fulfilled] : (state, action) => {
            state.list= action.payload;
            state.status = 'success';
        },
        [getDetailMovie.rejected] : (state, action) => {
            state.status = 'failed';
        },
    },
});

export default detailMovieSlice.reducer;