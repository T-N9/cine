import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import SlideCardItem from './SlideCardItem';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode } from "swiper";

const PopularMovies = () => {

    const [getData, setGetData] = useState(null);
    const { loading, data, error } = useFetch('https://api.themoviedb.org/3/trending/movie/day?api_key=68d49bbc8d40fff0d6cafaa7bfd48072');

    useEffect(() => {
        if (data != null) {
            setGetData(data.results)
        }
    });




    if (loading) return (
        <p>Loading...</p>
    );
    if (error) return (
        <p>Error ...</p>
    );

    let slideItems;
    if (getData != null) {
        slideItems = getData.map(item => {
            return (
                <SwiperSlide key={item.id}>
                    <SlideCardItem

                        title={item.title}
                        image={item.poster_path}
                        vote_avg={item.vote_average}
                        release_date={item.release_date}
                    />
                </SwiperSlide>
            )
        });
    }

    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={130}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
                breakpoints={{
                    1366 : {
                        "slidesPerView": 5,
                        "spaceBetween" : 0,
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

export default PopularMovies;
