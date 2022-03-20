import React, { useState, useEffect } from "react";
import styles from './styles/MovieContent.module.scss';
// import useFetch from "../../hooks/useFetch";
import { useParams } from 'react-router-dom';

const MovieContent = () => {


    const { type } = useParams();
    const [ getType, setGetType ] = useState('popular') 
    // const [ getData, setGetData ] = useState(null);
    const mainUrl = `https://api.themoviedb.org/3/`;

    useEffect(()=> [
        type ? setGetType(type) : setGetType('popular')
    ], [type])

    const categoryList = [
        {
            'title' : 'popular',
            'url' : `movie/popular?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
        },
        {
            'title' : 'top rated',
            'url' : `movie/top_rated?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
        }
    ]

    let chosenType = categoryList.filter(item => {
        if(getType === item.title) {
            return item.url;
        }
        
    }); 

    let typeUrl = `${mainUrl}${chosenType[0].url}`;
    console.log(typeUrl);

    // const {data, loading, error } = useFetch(typeUrl);

    return(
        <section className={styles.movie_content}>
            <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                <div>

                </div>
            </div>
        </section>
    )
}

export default MovieContent;