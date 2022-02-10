import React, { useState, useEffect } from 'react';
import styles from './styles/DetailCasts.module.scss';
import { CircularProgress } from '@mui/material';
import { ArrowCircleRight } from '@mui/icons-material';
import useFetch from '../../hooks/useFetch';
import CastsCard from './CastsCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import required modules
import { FreeMode } from "swiper";

const DetailCasts = (props) => {
    const [ getcasts, setgetcasts ] = useState(null);

    let urlLink;
    if (props.media_type !== undefined) {
        
        urlLink = `https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
    }

    const { loading, data, error } = useFetch(urlLink);

    useEffect(() => {
        if (data !== null) {
            setgetcasts(data)
        }
    }, [data]);

    let castsList;
    if(getcasts != null) {
        let castsToShow;
        if(getcasts.cast.length > 10) {
            castsToShow = getcasts.cast.slice(0 , 10);   
        }else {
            castsToShow = getcasts.cast;
        }

        castsList = castsToShow.slice(0 , 10).map(item => {
            return (
                <SwiperSlide
                key = {item.name}
                >
                    <CastsCard
                        name = {item.name}
                        profile_path = {item.profile_path}
                        image = {`https://www.themoviedb.org/t/p/w138_and_h175_face/${item.profile_path}`}
                        character = {item.character}
                    />
                </SwiperSlide>
            )
        });
    }

    if (loading) return (
        <section className={styles.loading_error}>
            <CircularProgress/>
        </section>
    );
    if (error) return (
        <section className={styles.loading_error}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    return (
        <section className={styles.detail_casts}>
            <div className={`${styles.container_x_md}`}>
                <h1 className={styles.title_2}>Top casts</h1>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="mySwiper"
                    breakpoints={{
                        1366 : {
                            "slidesPerView": 7,
                            "spaceBetween" : -20,
                        },
                        1024 : {
                            "slidesPerView": 5,
                            "spaceBetween" : 10,
                        },
                        768 : {
                            "slidesPerView": 4,
                            "spaceBetween" : 10,
                        },
                    }}
                > 
                { castsList } 

                <SwiperSlide
                >
                    <div className={styles.view_credits}>
                        <p>View all credits</p>

                        <ArrowCircleRight/>
                    </div>
                </SwiperSlide>
                </Swiper>
                
            </div>
            
        </section>
    );
}

export default DetailCasts;
