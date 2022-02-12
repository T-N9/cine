import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { SearchHeader } from '../components';

const SearchResults = () => {
    const { query } = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(makeLogoSmall());
    })


    return (
        <>
            <SearchHeader query = {query}/>  
        </>
    );
}

export default SearchResults;
