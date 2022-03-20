import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { SearchHeader, Footer } from '../components';
import { useDispatch } from 'react-redux';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { MovieContent } from '../components';

const MoviePage = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(makeLogoSmall());
    })

    return (
        <>
            <Helmet>
                <title>Discover movies | CINE</title>
                <meta name="title" content="Discover movies | CINE" />
                <meta name="description"
                    content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />
            </Helmet>
            <SearchHeader query='' />
            <MovieContent />
            <Footer />
        </>
    )
}

export default MoviePage;