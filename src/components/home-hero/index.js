import React, { useState, useEffect } from 'react';
import styles from './styles/HomeHero.module.scss';
import useFetch from '../../hooks/useFetch';
import SlideItem from './SlideItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
// redux actions
import { setTrendingAll } from '../../redux/trendingAllSlice';
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);

/* 
    HomeHero
    - This is the sliding component displayed at the very top of HomePage
    - To display TOP-5 trending list of MOVIE+SERIES
*/
const HomeHero = () => {
    const [getData, setGetData] = useState(null);
    const { loading, data, error } = useFetch('https://api.themoviedb.org/3/trending/all/day?api_key=68d49bbc8d40fff0d6cafaa7bfd48072');

    const dispatch = useDispatch();
    const { trendingAllData } = useSelector((state) => state.trending_all);

    useEffect(() => {
        if (data != null) {
            setGetData(data.results); 
        }

        // dispatch fetched data to redux
        if(trendingAllData === null) {
            dispatch(setTrendingAll(data));
        }
        
    }, [dispatch, data, trendingAllData]);

    if (loading) return (
        <section className={`${styles.error_loading_section} ${styles.error_loading_hero}`}>
            <CircularProgress/>
        </section>
    );
    if (error) return (
        <section className={`${styles.error_loading_section} ${styles.error_loading_hero}`}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    let slideItems;
    if (getData != null) {
        // initializing a list of Slide Items
        // - required SwiperSlide, SlideItem
        slideItems = trendingAllData.results.slice(0, 5).map(item => {
            return (
                <SwiperSlide key={item.id}>
                    <SlideItem
                        id = {item.id}
                        index = {trendingAllData.results.indexOf(item)}
                        backdrop_path={item.backdrop_path}
                        title={item.title}
                        overview={item.overview}
                        name={item.name}
                        media_type = {item.media_type}
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
                        className="mySwiper"
                        loop={true}
                        pagination={{
                            "clickable": true
                        }}
                        autoplay={{
                            "delay": 10000,
                            "disableOnInteraction": false
                        }}
                        speed={400}
                        breakpoints={{
                            1366 : {
                                "speed" : 800
                            }
                        }}
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
