import { createSlice } from "@reduxjs/toolkit";

export const navActiveSlice = createSlice({
    name : 'navActivate',
    initialState : {
        current : "home"
    },
    reducers : {
        activeNavItem : (state, action) => {
            state.current = action.payload;
        },
    },
});

export const { activeNavItem } = navActiveSlice.actions;
export default navActiveSlice.reducer;