import React, { useState, useEffect } from 'react';
import styles from './styles/TheatreMovies.module.scss';
import useFetch from '../../hooks/useFetch';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setTheatreMovies } from '../../redux/theatreMoviesSlice';
import SlideItem from './SlideItem';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const TheatreMovies = () => {

    const [getData, setGetData] = useState(null);
    const { theatreMoviesData } = useSelector((state) => state.theatreMovies)
    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data !== null) {
            setGetData(data.results);
        }

        if (theatreMoviesData === null) {
            dispatch(setTheatreMovies(data))
        }
    }, [dispatch, data, theatreMoviesData])

    if (loading) return (
        <section className={`${styles.error_loading_section} ${styles.error_loading_hero}`}>
            <CircularProgress />
        </section>
    );
    if (error) return (
        <section className={`${styles.error_loading_section} ${styles.error_loading_hero}`}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    let slideItems;
    if (getData !== null) {
        slideItems = theatreMoviesData.results.slice(0, 10).map(item => {
            return (
                <SwiperSlide key={item.id}>
                    <SlideItem
                        key={item.id}
                        id = {item.id}
                        title={item.title}
                        backdrop_path={item.backdrop_path}
                        media_type = {item.media_type}
                        overview = {item.overview}
                    />
                </SwiperSlide>
            )
        });
    }

    return (
        <section className={styles.theatre_movies}>
            <div className={styles.container_y_1}>
                <div className={styles.container_x_md}>
                    <h1 className={styles.title_2}>
                        In Theatres
                    </h1>
                </div>
                <div className={styles.slide_wrapper}>
                <Swiper
                        className="mySwiper"
                        loop={true}
                        pagination={{
                            "clickable": true
                        }}
                        // autoplay={{
                        //     "delay": 10000,
                        //     "disableOnInteraction": true
                        // }}
                        speed={400}
                        breakpoints={{
                            1366 : {
                                "speed" : 800
                            }
                        }}
                    >
                        {slideItems}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default TheatreMovies;