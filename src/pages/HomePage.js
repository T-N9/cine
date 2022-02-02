import React, { useEffect } from 'react';
import { HomeHero, PopularNow } from '../components';
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
            <PopularNow/>
        </>
    );
}

export default Homepage;
