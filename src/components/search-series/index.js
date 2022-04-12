import React, { useState, useEffect } from 'react';
import styles from './styles/SearchSeries.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';
import SearchResultCard from '../search-results-cards';
import { setSerieQty } from '../../redux/searchResultsSlice';
import Pagination from '../pagination';

const SearchSeries = (props) => {

    const [getData, setGetData] = useState(null);
    const [page, setPage] = useState(1);
    const { current } = useSelector((state) => state.searchActive)
    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/search/tv?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&query=${props.query}&page=${page}`);

    const dispatch = useDispatch();

    const getItemInfo = (id) => {
        dispatch(setItemId(id));
        dispatch(setItemType('serie'));
    }

    useEffect(() => {
        if (data != null) {
            setGetData(data);
            dispatch(setSerieQty(data.total_results));
        }
    }, [data, page, dispatch]);

    const pageClick = (page) => {
        setPage(page)
    }

    const goToBackPage = () => {
        setPage(prev => prev - 1)
    }

    const goToNextPage = () => {
        setPage(prev => prev + 1)
    }

    let serieResults, total_pages;
    if (getData != null) {

        total_pages = getData.total_pages;
        serieResults = getData.results.map(serie => {
            return (
                <div className={styles.card_wrapper} key={serie.id}>
                    <Link onClick={() => getItemInfo(serie.id)} to={`/series/${serie.id}`}>
                        <SearchResultCard
                            title={serie.title}
                            image={serie.poster_path}
                            name={serie.name}
                        />
                    </Link>
                </div>
            )
        });
    }

    if (loading) return (
        <section>
            <CircularProgress />
        </section>
    );
    if (error) return (
        <section>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    return (
        <>
            {
                current === 'series' &&
                <section className={styles.serie_result_page}>
                    <div className={`${styles.container_x_md} ${styles.container_y_2}`}>

                        <div className={styles.result_grid}>
                            {serieResults}
                        </div>

                        <Pagination
                            page={page}
                            pageClick={pageClick}
                            goToBackPage={goToBackPage}
                            goToNextPage={goToNextPage}
                            totalPages={total_pages}
                            query={props.query}
                            type="search"
                        />
                    </div>
                </section>
            }
        </>
    );
}

export default SearchSeries;
