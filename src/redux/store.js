import { configureStore } from "@reduxjs/toolkit";
import navActiveReducer from './navActiveSlice';

export const store = configureStore({
    reducer: {
        navActivate: navActiveReducer
    },
})