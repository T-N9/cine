import React, { useEffect } from 'react';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { SearchHeader, UpcomingAllMovies } from '../components';
import { useDispatch } from 'react-redux';

const UpcomingMoviesPage = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(makeLogoSmall())
    })

    return (
        <>
            <SearchHeader query=''/>
            <UpcomingAllMovies/>
        </>
    );
}

export default UpcomingMoviesPage;
