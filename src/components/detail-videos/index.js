import React, { useState, useEffect } from 'react';
import styles from './styles/DetailVideos.module.scss';
import useFetch from '../../hooks/useFetch';
import { nanoid } from '@reduxjs/toolkit';
import { ArrowCircleRight } from '@mui/icons-material';

const DetailVideos = (props) => {

    const [getData, setGetData] = useState(null);
    const { data } = useFetch(`https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`);

    useEffect(() => {
        if (data !== null) {
            setGetData(data);
        }
    }, [data]);

    let trailers, trailersList, view_more = true;

    if (getData !== null) {

        if (data.results.length !== 0) {
            if (data.results.length >= 3) {
                trailers = data.results.slice(0, 3);
            } else {
                trailers = data.results;
                view_more = false;
            }

            trailersList = trailers.map(item => {
                return (
                    <div key={nanoid()}>
                        <iframe className={styles.media_video} src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                )
            })
        } else {
            view_more = false;
            trailersList = null;
        }
    }

    return (
        <>
            <section className={styles.videos_list}>
                {
                    trailersList === null ?
                        <div class={styles.no_items}>
                            <h1>No Items available.</h1>
                        </div> :
                        trailersList
                }
                {
                    view_more === true &&
                    <div key={nanoid()} className={styles.view_more}>
                        <p>
                            View More
                        </p>

                        <ArrowCircleRight />
                    </div>
                }
            </section>
        </>
    );
}

export default DetailVideos;
