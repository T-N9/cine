import { configureStore } from "@reduxjs/toolkit";
import navActiveReducer from './navActiveSlice';
import trendingAllReducer from './trendingAllSlice';
import detailMovieTVSlice from './detailMovieTVSlice';

export const store = configureStore({
    reducer: {
        navActivate: navActiveReducer,
        trending_all : trendingAllReducer,
        detail_movie_tv : detailMovieTVSlice
    },
})