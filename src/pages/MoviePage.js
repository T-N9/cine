import React, {useEffect} from 'react';
import { SearchHeader } from '../components';
import { useDispatch } from 'react-redux';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { MovieContent } from '../components';

const MoviePage = () => {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(makeLogoSmall());
    })

    return (
        <>
            <SearchHeader query=''/>
            <MovieContent/>
        </>
    )
}

export default MoviePage;