import React from 'react';
import styles from './styles/DetailHero.module.scss';
import { AccessTimeSharp, StarRateRounded, People } from '@mui/icons-material';
import { Button } from '@mui/material';


const DetailHero = (props) => {

    let backdrop_path, poster_path, release_year, runtime , no_rate;
    if(props.backdrop_path !== undefined && props.poster_path !== undefined) {
        backdrop_path  = `https://www.themoviedb.org/t/p/original/${props.backdrop_path}`;
        poster_path = `https://www.themoviedb.org/t/p/original/${props.poster_path}`;
        release_year = props.release_date ? props.release_date.substring(0,4) : props.first_air_date.substring(0,4);

        function timeConvert(n) {
            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            return  rhours + "h" + rminutes + "m";
        }   

        no_rate = "NR";

        runtime = props.runtime ? timeConvert(props.runtime) : `${props.episode_run_time}m`;
    }

    return (
        <section 
            className={styles.detail_hero}
            style={{backgroundImage : `url(${backdrop_path})`}}
        >
            <div className={styles.detail_wrapper}>
                <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                    <div className={styles.flex_section}>
                        <img className={styles.detail_poster} src={`${poster_path}`} alt={`${props.title} poster`} />
                        <div className={styles.detail_movie_content}>
                            <div className={styles.detail_header}>
                                <h1 className={styles.title}>{props.title}
                                <span className={styles.year}>( {release_year} )</span>
                                </h1>
                                
                            </div>
                            <div className={styles.detail_neck}>
                                <div className={styles.content_rating}>
                                    <p>{props.content_rating}</p>
                                </div>
                                <p className={styles.genres}>
                                    {
                                    props.genres.map(item => {
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
                                props.tagline && 
                                <div className={styles.tagline}>
                                    <p>
                                        " {props.tagline} "
                                    </p>
                                </div>
                            }
                            <div className={styles.overview}>
                                <h1>Overview</h1>
                                <p>
                                    {props.overview}
                                </p>
                            </div>
                            <div className={styles.info}>
                                <div>
                                    <span className={styles.icon}>
                                        <StarRateRounded/>
                                    </span>
                                    <h1>
                                        {props.rating === 0 ? no_rate : props.rating}
                                    </h1>
                                </div>

                                <div>
                                    <span className={styles.icon}>
                                        <People/>
                                    </span>
                                    <h1>
                                        {props.popularity}
                                    </h1>
                                </div>
                            </div>
                            <Button variant='outlined' className={styles.trailer_btn}>
                                View Trailer
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DetailHero;
