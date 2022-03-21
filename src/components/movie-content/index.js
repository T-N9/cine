import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItemId, setItemType } from "../../redux/detailMovieTVSlice";
import styles from './styles/MovieContent.module.scss';
import { CircularProgress } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import SearchResultCard from "../search-results-cards";
import { Link, useParams } from 'react-router-dom';

const MovieContent = ({categoryList, setType }) => {


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

        setType(getType);
    }, [data]);


    let movieList;
    
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
            <div className=''>
                <div className={styles.movieList_grid}>
                    { movieList }
                </div>
            </div>
        </section>
    )
}

export default MovieContent;