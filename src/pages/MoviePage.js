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
                <title>Discover Movies</title>
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://ci-ne.vercel.app/discover/movies"/>
                <meta property="og:title" content="Discover Movies" />
                <meta property="og:description"
                    content="Discover movies in CINE." />
            </Helmet>
            <SearchHeader query='' />
            <MovieContent />
            <Footer />
        </>
    )
}

export default MoviePage;