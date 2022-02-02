import React from 'react';
import styles from './styles/DetailHero.module.scss';
import { AccessTimeSharp } from '@mui/icons-material';

const DetailHero = (props) => {


    let backdrop_path, poster_path, release_year, runtime;
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
                                <h1 className={styles.title}>{props.title}</h1>
                                <h2>( {release_year} )</h2>
                            </div>
                            <div className={styles.detail_neck}>
                                <div className={styles.content_rating}>
                                    <p>{props.content_rating}</p>
                                </div>
                                <p className={styles.genres}>
                                    {
                                    props.genres.map(item => {
                                        return (
                                            props.genres.indexOf(item) < props.genres.length-1 ?
                                            `${item} • ` : `${item}`
                                        )
                                    }
                                    )}
                                </p>
                                <p className={styles.runtime}>
                                    <AccessTimeSharp/>
                                    {runtime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DetailHero;
