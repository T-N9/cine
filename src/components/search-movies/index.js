import React, { useState, useEffect } from 'react';
import styles from './styles/SearchMovies.module.scss';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';

const SearchMovies = (props) => {

    const [ getData, setGetData ] = useState(null);
    const [ page, setPage] = useState(1);
    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&query=${props.query}&page=${page}`);

    const dispatch = useDispatch();

    const getItemInfo = (id) => {
        dispatch(setItemId(id));
        dispatch(setItemType('movie'));
    }

    useEffect(() => {
        if(data != null) {
            setGetData(data);
        }
    }, [data, page]);

    const pageClick =(page) => {
        setPage(page)
    }

    let movies, page_arr = [], pagination;
    if(getData != null) {
        // console.log(getData.results);
        movies = getData.results.map(movie => {
            return (
                <Link onClick={() => getItemInfo(movie.id)} key={movie.id} to={`/movies/${movie.id}`}>
                    <h1 >
                        {movie.title}
                    </h1>
                </Link>
            )
        });


        for(let i = 1; i <= getData.total_pages; i++) {
            page_arr.push(i);
            
        }
        pagination = page_arr.map((item) => {
            return (
                <div onClick={() => pageClick(item)} key={item} className={styles.paginate_page}>
                    <p>{item}</p>
                </div>
            )
        })
        

    }

    if (loading) return (
        <section>
            <CircularProgress/>
        </section>
    );
    if (error) return (
        <section>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    return (
        <section>
            { pagination }
            <div>
                {movies}
            </div>
        </section>
    );
}

export default SearchMovies;
