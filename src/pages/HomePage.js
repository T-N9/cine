import React, { useEffect } from 'react';
import { HomeHero, PopularNow, SearchForAll } from '../components';
import { makeLogoBig } from '../redux/navActiveSlice';
import { useDispatch } from 'react-redux';

const Homepage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(makeLogoBig());
    }, [dispatch]);

    return (
        <>
            <HomeHero/>
            <SearchForAll/>
            <PopularNow/>
        </>
    );
}

export default Homepage;
