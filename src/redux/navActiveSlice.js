import { createSlice } from "@reduxjs/toolkit";

export const navActiveSlice = createSlice({
    name : 'navActivate',
    initialState : {
        current : "home",
        logo_sm : false
    },
    reducers : {
        activeNavItem : (state, action) => {
            state.current = action.payload;
        },
        makeLogoBig : (state) => {
            state.logo_sm = false;
        },
        makeLogoSmall : (state) => {
            state.logo_sm = true;
        }
    },
});

export const { activeNavItem, makeLogoBig, makeLogoSmall } = navActiveSlice.actions;
export default navActiveSlice.reducer;