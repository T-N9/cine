import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { SearchHeader, SearchMovies, SearchAside, SearchSeries } from '../components';
import styles from '../Pages.module.scss';

const SearchResults = () => {
    const { query, page } = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(makeLogoSmall());
    });


    return (
        <>
            <SearchHeader query = {query}/>  
            <section className={styles.search_result_route_wrapper}>
                <div className={styles.search_wrapper}>
                    <SearchMovies query = {query} page={parseInt(page)}/>
                    <SearchSeries query = {query} page={parseInt(page)}/>
                </div>
                <SearchAside
                    query = {query}
                />
            </section>
        </>
    );
}

export default SearchResults;
