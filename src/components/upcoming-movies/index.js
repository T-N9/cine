import React, { useState, useEffect } from 'react';
import styles from './styles/UpcomingMovies.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUpcomingMovieData } from '../../redux/upcomingMovieSlice';
import useFetch from '../../hooks/useFetch';
import UpcomingItem from './UpcomingItem';
import { Button, CircularProgress } from '@mui/material';

const UpcomingMovies = () => {

    const [ getData, setGetData ] = useState(null);
    const [ maxNum , setMaxNum ] = useState(6);
    const dispatch = useDispatch();
    const { upcomingMoviesData } = useSelector((state) => state.upcoming_movies)

    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`);

    useEffect(() => {
        if(data !== null) {
            setGetData(data);
        }

        if(upcomingMoviesData === null) {
            dispatch(setUpcomingMovieData(data));
        }
    }, [ data , upcomingMoviesData,dispatch ]);

    const handelMaxNum = () => {
        setMaxNum( prev => prev+4);
    }

    let movieList;

    if(getData !== null) {
        movieList = upcomingMoviesData.results.slice(0, maxNum).map( item => {
            return(
                
                <UpcomingItem
                    key = {item.id}
                    id = {item.id}
                    title = {item.title}
                    poster_path = {item.poster_path}
                    overview = {item.overview}
                    release_date = {item.release_date}
                />
                
            )
        });
    }

    if (loading) return (
        <section className={`${styles.error_loading_section} ${styles.error_loading_hero}`}>
            <CircularProgress/>
        </section>
    );
    if (error) return (
        <section className={`${styles.error_loading_section} ${styles.error_loading_hero}`}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    return (
        <section className={styles.upcoming_movies}>
            <div className={`${styles.container_y_3} ${styles.container_x_md}` }>
                <div className={styles.header}>
                    <h1 className={styles.title_2}>
                        Upcoming Movies
                    </h1>

                    <Link to="/upcoming">
                        <div className={styles.view_all_btn}>
                            <p>
                                View All
                            </p>
                        </div>
                    </Link>
                </div>

                <div className={`${styles.list_grid} ${styles.container_y_1}`}>
                    { movieList }
                </div>
                {
                    !(maxNum >= 20) ?
                    <Button onClick={handelMaxNum} className={styles.view_more_btn} variant='outlined' size='small'>View More</Button> :
                    <Link to="/upcoming">
                        <Button className={styles.view_more_btn} variant='outlined' size='small'>View All</Button>
                    </Link>
                }
            </div>
        </section>
    );
}

export default UpcomingMovies;


