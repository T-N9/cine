import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTorrents } from '../../redux/detailMovieTVSlice';
import styles from './styles/DetailTorrent.module.scss';
import useFetch from '../../hooks/useFetch';

const DetailTorrent = (props) => {

    let { movie_name, imdb_id} = props;
    const dispatch = useDispatch();
    const [getData, setGetData] = useState(null);
    const { data, loading } = useFetch(`https://yts.mx/api/v2/list_movies.json?query_term=${imdb_id}`);

    useEffect(() => {
        if (data !== null) {
            if (movie_name !== '') {

                let targetMovie;
                if (data.data.movies) {

                    targetMovie = data.data.movies.filter(movie => {
                        return movie.imdb_code === imdb_id;
                    })

                    console.log(targetMovie);

                    if (targetMovie[0] !== undefined) {
                        dispatch(setTorrents(targetMovie[0].torrents))
                        setGetData(targetMovie[0].torrents)
                    }

                    targetMovie.length === 0 && dispatch(setTorrents([]));
                }
            }
        }
    }, [data, movie_name, imdb_id, dispatch])


    if (getData !== null) {
        // console.log(getData);
    }

    return (
        <section>
            <div className={styles.torrent_wrapper}>
                <h1>Download</h1>
                <div className={styles.torrents}>
                    {
                        loading &&
                        <p>Getting torrents</p>
                    }
                    {
                        (getData !== [] && getData !== null) &&
                        getData.map(torrent => {
                            return (
                                <a className={styles.torrent_item} key={torrent.url} href={`${torrent.url}`}>
                                    <p>
                                        <span className={styles.quality}>
                                            {torrent.quality}
                                        </span>
                                        .
                                        <span className={styles.type}>
                                            {torrent.type}
                                        </span>
                                    </p>
                                </a>
                            )
                        })
                    }
                    {
                        (!loading && getData === null) && 
                        <p>No torrents found!</p>
                    }
                </div>
            </div>
        </section>
    );
}

export default DetailTorrent;
