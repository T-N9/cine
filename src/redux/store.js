import { configureStore } from "@reduxjs/toolkit";
import navActiveReducer from './navActiveSlice';
import detailMovieTVSlice from './detailMovieTVSlice';

export const store = configureStore({
    reducer: {
        navActivate: navActiveReducer,
        detail_movie_tv : detailMovieTVSlice
    },
})