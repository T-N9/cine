import React, { useEffect } from 'react';
import { HomeHero, PopularNow, SearchForAll, TheatreMovies } from '../components';
import { makeLogoBig, activeNavItem } from '../redux/navActiveSlice';
import { setSearchActive } from '../redux/searchActiveSlice'
import { useDispatch } from 'react-redux';

const Homepage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(makeLogoBig());
        dispatch(activeNavItem('home'));
        dispatch(setSearchActive("movies"));
    }, [dispatch]);

    return (
        <>
            <HomeHero/>
            <SearchForAll/>
            <PopularNow/>
            <TheatreMovies/>
        </>
    );
}

export default Homepage;
