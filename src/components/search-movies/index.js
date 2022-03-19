import React, { useState, useEffect } from 'react';
import styles from './styles/SearchMovies.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';
import SearchResultCard from '../search-results-cards';
import { setMovieQty } from '../../redux/searchResultsSlice';
import Pagination from '../pagination';

const SearchMovies = (props) => {

    const [ getData, setGetData ] = useState(null);
    const [ page, setPage] = useState(props.page);
    const { current } = useSelector((state) => state.searchActive);
    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&query=${props.query}&page=${props.page}`);

    const dispatch = useDispatch();

    const getItemInfo = (id) => {
        dispatch(setItemId(id));
        dispatch(setItemType('movie'));
    }

    useEffect(() => {
        if(data != null) {
            setGetData(data);
            dispatch(setMovieQty(data.total_results));
        }
    }, [data, page , dispatch]);

    const pageClick =(page) => {
        setPage(page)
    }

    const goToBackPage = () => {
        setPage( prev => prev-1);
    }

    const goToNextPage = () => {
        setPage( prev => prev+1);
    }

    let movieResults, total_pages;
    if(getData != null) {
        total_pages = getData.total_pages;
        movieResults = getData.results.map(movie => {
            return (
                <div className={styles.card_wrapper} key={movie.id}>
                    <Link  onClick={() => getItemInfo(movie.id)}  to={`/movies/${movie.id}`}>
                        <SearchResultCard
                            title = {movie.title}
                            image = {movie.poster_path}
                            name = {movie.name}
                        />
                    </Link>
                </div>
            )
        });
    }

    if (loading) return (
        <section className={styles.error_loading_section}>
            <CircularProgress/>
        </section>
    );
    if (error) return (
        <section className={styles.error_loading_section}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    return (
        <section className={current === 'movies' ? `${styles.movie_result_page}` : `${styles.movie_result_page} ${styles.d_none}`}>
            <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                
                <div className={styles.result_grid}>
                    {movieResults}
                </div>

                <Pagination 
                    page = { page }
                    pageClick = { pageClick }
                    goToBackPage = { goToBackPage }
                    goToNextPage = { goToNextPage }
                    totalPages = {total_pages}
                    query = {props.query}
                    type="search"
                />
            </div>
        </section>
    );
}

export default SearchMovies;
