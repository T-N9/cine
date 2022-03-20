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
                <meta name="title" content="CINE | Live cinematic information" />
                <meta name="description"
                    content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />
            </Helmet>
            <HomeHero />
            <SearchForAll />
            <PopularNow />
            <TheatreMovies />
            <UpcomingMovies />
            <Footer />
        </>
    );
}

export default Homepage;
