import React, { useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { SearchHeader, SearchMovies, SearchAside, SearchSeries, Footer } from '../components';
import styles from '../Pages.module.scss';

const SearchResults = () => {

    const [ pageUrl, setPageUrl ] = useState(1);
    const { query, page } = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(makeLogoSmall());
        page ? setPageUrl(parseInt(page)) : setPageUrl(1);
    }, [dispatch, page]);


    return (
        <>
            <SearchHeader query = {query}/>  
            <section className={styles.search_result_route_wrapper}>
                <div className={styles.search_wrapper}>
                    <SearchMovies query = {query} page={pageUrl}/>
                    <SearchSeries query = {query} page={pageUrl}/>
                </div>
                <SearchAside
                    query = {query}
                />
            </section>
            <Footer/>
        </>
    );
}

export default SearchResults;
