import { createSlice } from "@reduxjs/toolkit";

export const detailMovieTVSlice = createSlice({
    name : 'detail_movie_tv',
    initialState : {
        item_id : null,
        item_type : 'movie'
    },
    reducers : {
        setItemId : (state, {payload}) => {
            state.item_id = payload;
        },
        setItemType : (state, {payload}) => {
            state.item_type = payload;
        }
    }
});

export const { setItemId, setItemType } = detailMovieTVSlice.actions;
export default detailMovieTVSlice.reducer;