import { createSlice } from "@reduxjs/toolkit";

export const detailMovieTVSlice = createSlice({
    name : 'detail_movie_tv',
    initialState : {
        item_id : null,
        item_type : 'movie',
        movie_name : '',
        imdb_id : '',
        torrents : []
    },
    reducers : {
        setItemId : (state, {payload}) => {
            state.item_id = payload;
        },
        setItemType : (state, {payload}) => {
            state.item_type = payload;
        },
        setMovieName : (state, {payload}) => {
            state.movie_name = payload;
        },
        setImdbId : (state, {payload}) => {
            state.imdb_id = payload;
        },
        setTorrents : (state, {payload}) => {
            state.torrents = payload;
        }
    }
});

export const { setItemId, setItemType, setImdbId, setMovieName, setTorrents } = detailMovieTVSlice.actions;
export default detailMovieTVSlice.reducer;