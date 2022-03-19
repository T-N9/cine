import React, { useState, useEffect } from 'react';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { SearchHeader, UpcomingAllMovies } from '../components';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const UpcomingMoviesPage = () => {

    const { page } = useParams();
    const [ pageUrl, setPageUrl ] = useState(1)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(makeLogoSmall())

        page ? setPageUrl(parseInt(page)) : setPageUrl(1);
    },[dispatch, page])


    return (
        <>
            <SearchHeader query=''/>
            <UpcomingAllMovies
                page = {pageUrl}
            />
        </>
    );
}

export default UpcomingMoviesPage;
