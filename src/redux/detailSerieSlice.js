import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getDetailSeries = createAsyncThunk('get/detail_series', async ({id}) => {
    return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases,content_ratings`).then ((res) => res.json());
});

const detailSeriesSlice = createSlice({
    name : "detail_series",
    initialState : {
        list : [],
        status : null,
    },
    extraReducers : {
        [getDetailSeries.pending] : (state, action) => {
            state.status = "loading";
        },
        [getDetailSeries.fulfilled] : (state, action) => {
            state.list= action.payload;
            state.status = 'success';
        },
        [getDetailSeries.rejected] : (state, action) => {
            state.status = 'failed';
        },
    },
});

export default detailSeriesSlice.reducer;