import React, { useState, useEffect } from 'react';
// import styles from './styles/DetailTorrent.module.scss';
import { useDispatch } from 'react-redux';
import { setTorrents } from '../../redux/detailMovieTVSlice';
import useFetch from '../../hooks/useFetch';

const DetailTorrent = (props) => {

    const dispatch = useDispatch();
    const [getData, setGetData] = useState(null);
    const { data } = useFetch(`https://yts.mx/api/v2/list_movies.json?query_term=${props.movie_name}( ${props.year} )`);
    // console.log(props.movie_name);

    useEffect(() => {
        if (data !== null) {
            if (props.movie_name !== '') {
                setGetData(data);

                let targetMovie;
                if (data.data.movies) {

                    targetMovie = data.data.movies.filter(movie => {
                        return movie.imdb_code === props.imdb_id;
                    })

                    // console.log(targetMovie);

                    if (targetMovie[0] !== undefined) {
                        // console.log(targetMovie[0].torrents);
                        dispatch(setTorrents(targetMovie[0].torrents))
                    }

                    targetMovie.length === 0 && dispatch(setTorrents([]));
                }
            }
        }
    }, [data, props.movie_name, props.imdb_id, dispatch])

    

    if (getData !== null) {

        // console.log(data);
    }

    return (
        <section>
            <h1>{props.imdb_id}</h1>
        </section>
    );
}

export default DetailTorrent;
