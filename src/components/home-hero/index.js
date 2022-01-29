import React, { useState, useEffect } from 'react';
import styles from './styles/HomeHero.module.scss';
import useFetch from '../../hooks/useFetch';
import SlideItem from './SlideItem';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/swiper-bundle.min.css";
import "swiper/css/pagination"

// import Swiper core and required modules
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const HomeHero = () => {
    const [getData, setGetData] = useState(null)
    const { loading, data, error } = useFetch('https://api.themoviedb.org/3/trending/all/day?api_key=68d49bbc8d40fff0d6cafaa7bfd48072');

    useEffect(() => {
        if (data != null) {
            setGetData(data.results)
        }
        // console.log(getData);
    })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let slideItems;
    if (getData != null) {

        slideItems = getData.slice(0, 5).map(item => {
            return (
                <SwiperSlide key={item.id}>
                    <SlideItem
                        index = {getData.indexOf(item)}
                        backdrop_path={item.backdrop_path}
                        title={item.title}
                        overview={item.overview}
                        name={item.name}
                    />
                </SwiperSlide>
            )
        })
    }

    return (
        <section className={styles.home_hero}>
            <div>
                <div>
                    <Swiper
                        pagination={true}
                        className="mySwiper"
                        loop={true}
                        pagination={{
                            "clickable": true
                        }}
                        autoplay={{
                            "delay": 5000,
                            "disableOnInteraction": false
                        }}
                        speed={800}
                    >
                        {
                            slideItems
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default HomeHero;