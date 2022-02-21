import React, { useState, useEffect } from 'react';
import styles from './styles/SearchMovies.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import useFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';
import SearchResultCard from '../search-results-cards';
import { setMovieQty } from '../../redux/searchResultsSlice';

const SearchMovies = (props) => {

    const [ getData, setGetData ] = useState(null);
    const [ page, setPage] = useState(1);
    const { current } = useSelector((state) => state.searchActive)
    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&query=${props.query}&page=${page}`);

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
        setPage( prev => prev-1)
    }

    const goToNextPage = () => {
        setPage( prev => prev+1)
    }

    let movieResults, page_arr = [], paginationNow, endOfPagination , startOfPagination,  paginationStart, paginationEnd;
    if(getData != null) {
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


        for(let i = 1; i <= getData.total_pages; i++) {
            page_arr.push(i);
        }

        let paginateShow;
        if(page_arr.length > 7) {
            paginationEnd = [page_arr.length-1, page_arr.length];
            paginationStart = [1, 2];
            if(page === 1 || page === 2){
                paginateShow = page_arr.slice(0,5)   
            }else if(page >= page_arr.length-3){
                paginateShow = [page_arr.length-4,page_arr.length-3,page_arr.length-2,page_arr.length-1, page_arr.length];
            }else{
                paginateShow = [page-2, page-1, page, page+1, page+2]; 
            }
        }else{
            paginateShow = page_arr;
        }


        paginationNow = paginateShow.map((item) => {
            return (
                <div onClick={() => pageClick(item)} key={item} className={item === page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                    <p>{item}</p>
                </div>
            )
        })

        if(page_arr.length > 7 && page < page_arr.length-3) {
            endOfPagination = paginationEnd.map((item) => {
                return (
                    <div onClick={() => pageClick(item)} key={item} className={item === page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                        <p>{item}</p>
                    </div>
                )
            });
        }else if(page >= page_arr.length-3){
            endOfPagination = '';
        }else {
            endOfPagination = '';
        }

        if(page > 7) {
            startOfPagination = paginationStart.map((item) => {
                return (
                    <div onClick={() => pageClick(item)} key={item} className={item === page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                        <p>{item}</p>
                    </div>
                )
            });
        } else {
            startOfPagination = '';
        }
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

                <div className={styles.paginate_wrapper}>
                    <button onClick={goToBackPage} disabled={page === 1}>
                        <ArrowBackIosRounded/>
                    </button>
                    <div className={styles.paginate}>
                        { startOfPagination }
                        { startOfPagination !== '' && <span> ... </span> }
                        { paginationNow }
                        { endOfPagination !== '' && <span> ... </span> }
                        { endOfPagination }
                    </div>
                    <button onClick={goToNextPage} disabled={page === page_arr.length}>
                        <ArrowForwardIosRounded/>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SearchMovies;
