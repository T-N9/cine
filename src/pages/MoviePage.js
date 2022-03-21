import React, {useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from '../Pages.module.scss';
import { SearchHeader, Footer } from '../components';
import { useDispatch } from 'react-redux';
import { makeLogoSmall, activeNavItem } from '../redux/navActiveSlice';
import { MovieContent } from '../components';

const MoviePage = () => {

    const categoryList = [
        {
            'title' : 'popular',
            'url' : `movie/popular?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
        },
        {
            'title' : 'top rated',
            'url' : `movie/top_rated?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
        },
        {
            'title' : 'action',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=28`
        },
        {
            'title' : 'comedy',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=35`
        },
        {
            'title' : 'horror',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=27`
        },
        {
            'title' : 'thriller',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=53`
        },
        {
            'title' : 'crime',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=80`
        },
        {
            'title' : 'romance',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=10749`
        },
        {
            'title' : 'drama',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=18`
        },
        {
            'title' : 'family',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=10751`
        },
        {
            'title' : 'fantasy',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=14`
        },
        {
            'title' : 'history',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=36`
        },
        {
            'title' : 'music',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=10402`
        },
        {
            'title' : 'mystery',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=9648`
        },
        {
            'title' : 'adventure',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=12`
        },
        {
            'title' : 'documentary',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=99`
        },
        {
            'title' : 'sci-fi',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=878`
        },
        {
            'title' : 'war',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=10752`
        },
        {
            'title' : 'western',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=37`
        },
        {
            'title' : 'animation',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=16`
        },
        {
            'title' : 'tv movie',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=10770`
        }
    ]

    const [ activeType, setActiveType ] = useState('popular')

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(makeLogoSmall());
        dispatch(activeNavItem('movies'));
    });

    const setType = (type) => {
        setActiveType(type);
    }

    const typeBtnList  = categoryList.map(category => {
        return(
            <Link key={category.title} to={`/discover/movies/${category.title}`}>
                <div className={activeType === category.title ? `${styles.typeBtn} ${styles.active}` : `${styles.typeBtn}`}>
                    <p>
                        {category.title}
                    </p>
                </div>
            </Link>
        )
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

            <div className={`${styles.discover_flex} ${styles.container_x_md} ${styles.container_y_2}`}>
                <div className={styles.typeBtn_wrapper}>
                    <div className={styles.typeBtn_flex}>
                            { typeBtnList }
                    </div>
                </div>
                <MovieContent
                    categoryList = {categoryList}
                    setType = {setType}
                />
            </div>
            <Footer />
        </>
    )
}

export default MoviePage;