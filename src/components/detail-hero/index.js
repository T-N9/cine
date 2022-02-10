import React, { useState, useEffect } from 'react';
import styles from './styles/DetailHero.module.scss';
import useFetch from '../../hooks/useFetch';
import { CircularProgress } from '@mui/material';
import { AccessTimeSharp, StarRateRounded, People } from '@mui/icons-material';
import { Button } from '@mui/material';
import DetailTrailer from '../detail-trailer';

const DetailHero = (props) => {

    const [getData, setGetData] = useState(null);
    const [ showTrailer, setShowTrailer ] = useState(false);

    let urlLink ;
    if(props.media_type === 'movie') {
        urlLink = `https://api.themoviedb.org/3/movie/${props.id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases`
    } else {
        urlLink = `https://api.themoviedb.org/3/tv/${props.id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases,content_ratings`
    }

    const { loading, data, error } = useFetch(urlLink);

    useEffect(() => {
        if (data != null) {
            setGetData(data)
        }
    }, [ data]);

    let title, 
    backdrop_path, 
    poster_path , 
    content_rating_US,
    content_rating,
    genres = [],
    release_date,
    runtime,
    overview,
    rating,
    popularity,
    status,
    tagline,
    trailer,
    media_type,
    first_air_date,
    episode_run_time;
    
    if(getData != null) {
        title = getData.name ? getData.name : getData.original_title;
        backdrop_path = getData.backdrop_path;
        poster_path = getData.poster_path;

        if(props.media_type === 'movie') {
            content_rating_US = getData.releases.countries.filter(item => {
                return(item.iso_3166_1 === "US")
            });

            let i = 1;
            do {
                content_rating=content_rating_US[content_rating_US.length - i].certification;
                i++;
            }while(content_rating === '');
            
        }else {
            content_rating_US = getData.content_ratings.results.filter(item => {
                return(item.iso_3166_1 === "US")
            });
            let i = 1;
            do {
                content_rating= content_rating_US[content_rating_US.length-i].rating;
                i++;
            }while(content_rating === '');
        }
        // console.log(content_rating_US,content_rating_US.length, content_rating);

        getData.genres.map(item => {
            return (
                genres.push(item.name)
            )
        });
        release_date = getData.release_date;
        runtime = getData.runtime;
        overview = getData.overview;
        rating = getData.vote_average;
        popularity = getData.popularity;
        status = getData.status;
        tagline= getData.tagline;

        if(getData.videos.results.length > 0){
            trailer = getData.videos.results[0].key;
        }else {
            trailer = null;
        }
        
        first_air_date = getData.first_air_date;
        episode_run_time= getData.episode_run_time;
        media_type = "movie";

    }

    if (loading) return (
        <section className={styles.info_loading_error}>
            <CircularProgress/>
        </section>
    );
    if (error) return (
        <section className={styles.info_loading_error}>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    
    let  release_year, no_rate;
    if(backdrop_path !== undefined && poster_path !== undefined) {
        backdrop_path  = `https://www.themoviedb.org/t/p/original/${backdrop_path}`;
        poster_path = `https://www.themoviedb.org/t/p/original/${poster_path}`;
        release_year = release_date ? release_date.substring(0,4) : first_air_date.substring(0,4);

        function timeConvert(n) {
            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            return  rhours + "h" + rminutes + "m";
        }   

        no_rate = "NR";

        runtime = runtime ? timeConvert(runtime) : `${episode_run_time}m`;
    }

    const handleTrailer = () => {
        setShowTrailer(prev => !prev);
    }

    return (
        <section 
            className={styles.detail_hero}
            style={{backgroundImage : `url(${backdrop_path})`}}
        >
            <div className={styles.detail_wrapper}>
                <div className={styles.d_none}>
                    { status && media_type}
                </div>
                <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                    <div className={styles.flex_section}>
                        <img className={styles.detail_poster} src={`${poster_path}`} alt={`${title} poster`} />
                        <div className={styles.detail_movie_content}>
                            <div className={styles.detail_header}>
                                <h1 className={styles.title}>{title}
                                <span className={styles.year}>( {release_year} )</span>
                                </h1>
                                
                            </div>
                            <div className={styles.detail_neck}>
                                {
                                    content_rating && 
                                    <div className={styles.content_rating}>
                                        <p>{content_rating}</p>
                                    </div>
                                }
                                
                                <p className={styles.genres}>
                                    {
                                    genres.map(item => {
                                        return (  
                                            <span key={item} className={styles.genre}>{item}</span>
                                        )
                                    }
                                    )}
                                </p>
                                <p className={styles.runtime}>
                                    <AccessTimeSharp/>
                                    {runtime}
                                </p>
                            </div>
                            {
                                tagline && 
                                <div className={styles.tagline}>
                                    <p>
                                        " {tagline} "
                                    </p>
                                </div>
                            }
                            <div className={styles.overview}>
                                <h1>Overview</h1>
                                <p>
                                    {overview}
                                </p>
                            </div>
                            <div className={styles.info}>
                                <div>
                                    <span className={styles.icon}>
                                        <StarRateRounded/>
                                    </span>
                                    <h1>
                                        {rating === 0 ? no_rate : rating}
                                    </h1>
                                </div>

                                <div>
                                    <span className={styles.icon}>
                                        <People/>
                                    </span>
                                    <h1>
                                        {popularity}
                                    </h1>
                                </div>
                            </div>
                            <Button onClick={handleTrailer} variant='outlined' className={styles.trailer_btn}>
                                View Trailer
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <DetailTrailer 
                trailer = {trailer}
                showTrailer = {showTrailer}
                handleTrailer = {handleTrailer}
            />
        </section>
    );
}

export default DetailHero;
