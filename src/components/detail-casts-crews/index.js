import React, { useState, useEffect } from 'react';
import styles from './styles/DetailCasts.module.scss';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgress } from '@mui/material';
import { ArrowCircleRight } from '@mui/icons-material';
import useFetch from '../../hooks/useFetch';
import CastsCard from './CastsCard';
import CrewsCard from './CrewsCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import required modules
import { FreeMode } from "swiper";

const DetailCasts = (props) => {

    const [getcasts, setgetcasts] = useState(null);
    const [getcrews, setgetcrews] = useState(null);

    let urlLink;
    if (props.media_type !== undefined) {

        urlLink = `https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
    }

    const { loading, data, error } = useFetch(urlLink);

    useEffect(() => {
        if (data !== null) {
            setgetcasts(data.cast);
            setgetcrews(data.crew);
        }
    }, [data]);

    let castsList, crewsList;
    if (getcasts !== null && getcrews !== null) {
        let castsToShow,
            crewsToShow = [];
        if (getcasts.length > 11) {
            castsToShow = getcasts.slice(0, 11);
        } else {
            castsToShow = getcasts;
        }

        //  To Crews
        getcrews.filter(item => {
            item.job === 'Director' && crewsToShow.push(item);
            return item.job === 'Director';
        });

        getcrews.filter(item => {
            item.job === 'Producer' && crewsToShow.push(item);
            return item.job === 'Producer';
        })

        getcrews.filter(item => {
            item.job === 'Novel' && crewsToShow.push(item);
            return item.job === 'Novel';
        })

        getcrews.filter(item => {
            item.job === 'Characters' && crewsToShow.push(item);
            return item.job === 'Characters';
        })

        getcrews.filter(item => {
            item.job === 'Writer' && crewsToShow.push(item);
            return item.job === 'Writer';
        })

        getcrews.filter(item => {
            item.job === 'Executive Producer' && crewsToShow.push(item);
            return item.job === 'Executive Producer';
        })

        castsList = castsToShow.map(item => {
            return (
                <SwiperSlide
                    key={item.name}
                >
                    <CastsCard
                        name={item.name}
                        profile_path={item.profile_path}
                        image={`https://www.themoviedb.org/t/p/w138_and_h175_face/${item.profile_path}`}
                        character={item.character}
                    />
                </SwiperSlide>
            )
        });

        crewsList = crewsToShow.map(item => {
            return (
                <SwiperSlide
                    key={nanoid()}
                >
                    <CrewsCard

                        image={item.profile_path}
                        name={item.name}
                        department={item.department}
                        job={item.job}
                    />
                </SwiperSlide>

            )
        })
    }

    if (loading) return (
        <section className={styles.loading_error}>
            <CircularProgress />
        </section>
    );
    if (error) return (
        <section className={styles.loading_error}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    return (
        <>
            <section className={styles.detail_casts}>
                <div className={`${styles.container_x_md}`}>
                    <h1 className={styles.title_2}>Top Casts</h1>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        modules={[FreeMode]}
                        className="mySwiper"
                        breakpoints={{
                            1366: {
                                "slidesPerView": 9,
                                "spaceBetween": -20,
                            },
                            1024: {
                                "slidesPerView": 6,
                                "spaceBetween": 10,
                            },
                            768: {
                                "slidesPerView": 5,
                                "spaceBetween": 10,
                            },
                        }}
                    >
                        {castsList}

                        <SwiperSlide
                        >
                            <div className={styles.view_credits}>
                                <p>View all credits</p>

                                <ArrowCircleRight />
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>

            </section>
            <section className={styles.detail_crews}>
                <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                    <h1 className={styles.title_2}>Top Crews</h1>
                    <Swiper
                        slidesPerView={1.5}
                        spaceBetween={5}
                        freeMode={true}
                        modules={[FreeMode]}
                        className="mySwiper"
                        breakpoints={{
                            1366: {
                                "slidesPerView": 6,
                                // "spaceBetween" : ,
                            },
                            1024: {
                                "slidesPerView": 5,
                                // "spaceBetween" : 10,
                            },
                            768: {
                                "slidesPerView": 3,
                                // "spaceBetween" : 10,
                            },
                        }}
                    >
                        {crewsList}
                        <SwiperSlide
                        >
                            <div className={styles.view_credits}>
                                <p>View all credits</p>

                                <ArrowCircleRight />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    );
}

export default DetailCasts;
