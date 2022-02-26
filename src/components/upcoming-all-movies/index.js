import React, { useState, useEffect } from 'react';
import styles from './styles/UpcomingAllMovies.module.scss';
import { CircularProgress } from '@mui/material';
import useFetch from '../../hooks/useFetch';
import UpcomingItem from '../upcoming-movies/UpcomingItem';
import Pagination from '../pagination';

const UpcomingAllMovies = () => {


    const [ getData, setGetData ] = useState(null);
    const [ page, setPage] = useState(1);
    const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US&page=${page}`);

    useEffect(() => {
        if(data !== null) {
            setGetData(data);
        }
    }, [data, page]);

    const pageClick =(page) => {
        setPage(page)
    }

    const goToBackPage = () => {
        setPage( prev => prev-1)
    }

    const goToNextPage = () => {
        setPage( prev => prev+1)
    }

    let movieList, total_pages;

    if(getData !== null) {
        total_pages = getData.total_pages;
        movieList = getData.results.map( item => {
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
        <section className={`${styles.error_loading_section}`}>
            <CircularProgress />
        </section>
    );
    if (error) return (
        <section className={`${styles.error_loading_section}`}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    return (
        <section>
            <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                <div className={`${styles.list_grid}`}>
                    { movieList }
                </div>

                <Pagination 
                    page = { page }
                    pageClick = { pageClick }
                    goToBackPage = { goToBackPage }
                    goToNextPage = { goToNextPage }
                    totalPages = {total_pages}
                />
            </div>
        </section>
    );
}

export default UpcomingAllMovies;
