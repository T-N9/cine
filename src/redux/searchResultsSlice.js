import { createSlice } from '@reduxjs/toolkit';

export const searchResultsSlice = createSlice({
    name : 'searchResults',
    initialState : {
        movies : 0,
        series : 0,
        crews : 0
    },
    reducers : {
        setMovieQty : (state, action) => {
            state.movies = (action.payload);
        },
        setSerieQty : (state, action) => {
            state.series = (action.payload);
        },
        setCrewsQty : (state, action) => {
            state.crews = (action.payload);
        }
    }
});

export const { setMovieQty, setSerieQty, setCrewsQty } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;