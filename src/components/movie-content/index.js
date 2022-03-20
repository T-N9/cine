import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItemId, setItemType } from "../../redux/detailMovieTVSlice";
import styles from './styles/MovieContent.module.scss';
import { CircularProgress } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import SearchResultCard from "../search-results-cards";
import { Link, useParams } from 'react-router-dom';

const MovieContent = () => {


    const { type } = useParams();
    const [ getType, setGetType ] = useState('popular') 
    const [ getData, setGetData ] = useState(null);
    const mainUrl = `https://api.themoviedb.org/3/`;

    const dispatch = useDispatch();

    const getItemInfo = (id) => {
        dispatch(setItemId(id));
        dispatch(setItemType('movie'));
    }

    useEffect(()=> [
        type ? setGetType(type) : setGetType('popular')

 
    ], [type]);

    const categoryList = [
        {
            'title' : 'popular',
            'url' : `movie/popular?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
        },
        {
            'title' : 'top rated',
            'url' : `movie/top_rated?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
        },
        {
            'title' : 'action',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=28`
        },
        {
            'title' : 'comedy',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=35`
        },
        {
            'title' : 'horror',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=27`
        },
        {
            'title' : 'romance',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=10749`
        },
        {
            'title' : 'mystery',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=9648`
        },
        {
            'title' : 'sci-fi',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=878`
        },
        {
            'title' : 'western',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=37`
        },
        {
            'title' : 'animation',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=16`
        },
        {
            'title' : 'tv movie',
            'url' : `discover/movie?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&with_genres=10770`
        }
    ]

    let chosenType = categoryList.filter(item => {
        if(getType === item.title) {
            return item.url;
        }
        
    }); 

    let typeUrl = `${mainUrl}${chosenType[0].url}`;
    // console.log(typeUrl);

    const {data, loading, error } = useFetch(typeUrl);

    useEffect(()=>{
        if( data !== null){
            setGetData(data);
    
        }
    }, [data]);


    let typeBtnList, movieList;
    
    if(getData !== null) {
        // console.log(getData);

        movieList = getData.results.map(item => {
            return(
                <div key={item.id} className={styles.card_wrapper}>
                    <Link  onClick={() => getItemInfo(item.id)}  to={`/movies/${item.id}`}>
                        <SearchResultCard
                        title = {item.title}
                        image = {item.poster_path}
                        name = {item.name}
                        />
                    </Link>
                </div>
            )
        });

        typeBtnList = categoryList.map(category => {
            return(
                <Link key={category.title} to={`/discover/movies/${category.title}`}>
                    <div className={styles.typeBtn}>
                        <p>
                            {category.title}
                        </p>
                    </div>
                </Link>
            )
        })
    }

    if (loading) return (
        <section className={styles.error_loading_section}>
            <CircularProgress />
        </section>
    );
    if (error) return (
        <section className={styles.error_loading_section}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );


    return(
        <section className={styles.movie_content}>
            <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                <div className={styles.typeBtn_flex}>
                    { typeBtnList }
                </div>
                <div className={styles.movieList_grid}>
                    { movieList }
                </div>
            </div>
        </section>
    )
}

export default MovieContent;