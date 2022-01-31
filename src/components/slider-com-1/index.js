import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import SlideCardItem from './SlideCardItem';
import styles from './styles/SliderCom1.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
// import required modules
import { FreeMode , Navigation} from "swiper";

const SliderCom1 = (props) => {

    const [getData, setGetData] = useState(null);
    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/trending/${props.type}/day?api_key=68d49bbc8d40fff0d6cafaa7bfd48072`);

    useEffect(() => {
        if (data != null) {
            setGetData(data.results)
        }
    });

    if (loading) return (
        <section className={`${styles.error_loading_section} ${styles.error_loading_slides}`}>
            <CircularProgress/>
        </section>
    );
    if (error) return (
        <section className={`${styles.error_loading_section} ${styles.error_loading_slides}`}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    let slideItems;
    if (getData != null) {
        slideItems = getData.map(item => {
            return (
                <SwiperSlide key={item.id}>
                    <SlideCardItem
                        id = {item.id}
                        title={item.title}
                        name = {item.name}
                        image={item.poster_path}
                        vote_avg={item.vote_average}
                        release_date={item.release_date}
                        media_type = {item.media_type}
                    />
                </SwiperSlide>
            )
        });
    }

    return (
        <>
            <Swiper
                slidesPerView={1.5}
                spaceBetween={0}
                // freeMode={true}
                // modules={[FreeMode]}
                // navigation={true}
                // modules={[Navigation]}
                centeredSlides={true}
                className="mySwiper"
                breakpoints={{
                    1366 : {
                        "slidesPerView": 5,
                        "spaceBetween" : -50,
                        "centeredSlides" : false
                    },
                    1024 : {
                        "slidesPerView": 4,
                        "spaceBetween" : 10,
                        "centeredSlides" : false
                    },
                    768 : {
                        "slidesPerView": 3,
                        "spaceBetween" : 30,
                        "centeredSlides" : false
                    }
                }}
            >{slideItems}
            </Swiper>

        </>
    );
}

export default SliderCom1;
