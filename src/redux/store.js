import { configureStore } from "@reduxjs/toolkit";
import navActiveReducer from './navActiveSlice';
import trendingAllReducer from './trendingAllSlice';
import detailMovieReducer from './detailMovieSlice';
import detailSerieReducer from './detailSerieSlice';
import trendingMoviesReducer from './trendingMoviesSlice';

export const store = configureStore({
    reducer: {
        navActivate: navActiveReducer,
        trending_all : trendingAllReducer,
        trending_movies : trendingMoviesReducer,
        detail_movie : detailMovieReducer,
        detail_series : detailSerieReducer
    },
})