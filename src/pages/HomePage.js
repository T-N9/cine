import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { HomeHero, PopularNow, SearchForAll, TheatreMovies, UpcomingMovies, Footer } from '../components';
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
            <Helmet>
                <title>CINE | Live cinematic information</title>
            </Helmet>
            <HomeHero/>
            <SearchForAll/>
            <PopularNow/>
            <TheatreMovies/>
            <UpcomingMovies/>
            <Footer/>
        </>
    );
}

export default Homepage;
