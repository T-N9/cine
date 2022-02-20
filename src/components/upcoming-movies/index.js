import React, { useState, useEffect } from 'react';
import styles from './styles/UpcomingMovies.module.scss';
import useFetch from '../../hooks/useFetch';
import UpcomingItem from './UpcomingItem';

const UpcomingMovies = () => {

    const [ getData, setGetData ] = useState(null);

    const { data } = useFetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`);

    useEffect(() => {
        if(data !== null) {
            setGetData(data);
        }
    }, [ data ]);

    let movieList;

    if(getData !== null) {
        movieList = getData.results.slice(0, 6).map( item => {
            return(
                
                <UpcomingItem
                    key = {item.id}
                    id = {item.id}
                    title = {item.title}
                    poster_path = {item.poster_path}
                    overview = {item.overview}
                />
                
            )
        })

    }

    return (
        <section className={styles.upcoming_movies}>
            <div className={`${styles.container_y_3} ${styles.container_x_md}` }>
                <h1 className={styles.title_2}>
                    Upcoming Movies
                </h1>

                <div className={`${styles.list_grid} ${styles.container_y_1}`}>
                    { movieList }
                </div>
            </div>
        </section>
    );
}

export default UpcomingMovies;


