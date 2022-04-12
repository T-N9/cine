import React, { useState, useEffect } from 'react';
import styles from './styles/DetailImages.module.scss';
import useFetch from '../../hooks/useFetch';
import { nanoid } from '@reduxjs/toolkit';
import { ArrowCircleRight } from '@mui/icons-material';

const DetailImages = (props) => {

    const [getData, setGetData] = useState(null);
    const { data } = useFetch(`https://api.themoviedb.org/3/${props.media_type}/${props.id}/images?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`);

    useEffect(() => {

        if (data !== null) {
            setGetData(data)
        }
    }, [data]);

    let backdrops, backdropsList, view_more = true;

    if (getData !== null) {
        if (data.backdrops.length !== 0) {
            if (data.backdrops.length >= 5) {
                backdrops = data.backdrops.slice(0, 5);
            } else {
                backdrops = data.backdrops;
                view_more = false;
            }

            backdropsList = backdrops.map(item => {
                return (
                    <div key={nanoid()} className={styles.backdrop_item}>
                        <img className={styles.image} src={`https://image.tmdb.org/t/p/w500${item.file_path}`} alt="backdrops" />
                    </div>
                )
            })
        } else {
            backdrops = [];

            backdropsList = null;
            view_more = false;
        }



        // console.log(getData);
    }

    return (
        <>
            <h1 className={styles.title_2}>
                Related Media
            </h1>
            <section className={styles.backdrops}>

                {
                    backdropsList === null ?
                        <div class={styles.no_items}>
                            <h1>No Items available.</h1>
                        </div> :
                        backdropsList
                }
                {
                    view_more === true &&
                    <div key={nanoid()} className={`${styles.backdrop_item} ${styles.view_more}`}>
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

export default DetailImages;
