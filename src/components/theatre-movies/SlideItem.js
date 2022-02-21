import React, { useEffect, useState } from 'react';
import styles from './styles/SlideItem.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';
import useFetch from '../../hooks/useFetch';
import { StarRateRounded, PlayCircleOutlineRounded } from '@mui/icons-material';
import { Imdb } from '@icons-pack/react-simple-icons';
import TheatreTrailer from '../theatre-trailer';

const SlideItem = (props) => {

    let route_type = 'movies';
    const [getData, setGetData] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    const dispatch = useDispatch();
    const getItemInfo = () => {
        dispatch(setItemId(props.id));
        dispatch(setItemType('movie'));
    }

    const { data } = useFetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos`)

    useEffect(() => {
        if (data !== null) {
            setGetData(data)
        }
    }, [data]);

    const handleTrailer = () => {
        setShowTrailer(prev => !prev);
    }

    let tagline,
        poster_path,
        rating,
        imdbRating,
        trailer,
        trailer_official;

    if (getData !== null) {
        tagline = data.tagline;
        poster_path = data.poster_path;
        rating = data.vote_average;
        imdbRating = data.imdb_id;

        if (data.videos.results.length > 0) {
            trailer_official = data.videos.results.filter(item => {
                return (item.type === 'Trailer' && item.official === true)
            });

            trailer = trailer_official[0].key;
        } else {
            trailer = null;
        }
    }

    return (
        <>
            <div className={styles.slide_item}>
                <div className={styles.slide_cover}
                    style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/original/${props.backdrop_path})` }}
                >
                    <TheatreTrailer
                        trailer={trailer}
                        showTrailer={showTrailer}
                        handleTrailer={handleTrailer}
                    />
                    
                    <div className={styles.overlay}>
                        <div onClick={handleTrailer} className={styles.play_icon}>
                            <PlayCircleOutlineRounded fontSize='large' />
                        </div>
                        <p>Watch Trailer</p>
                    </div>
                    
                    <div className={styles.bottom_overlay}>

                    </div>
                </div>
                <div className={styles.slide_content}>
                    {
                    poster_path !== 'undefined' && 
                    <img className={styles.poster} src={`https://www.themoviedb.org/t/p/original/${poster_path}`} alt={props.title} />
                    }
                    <div className={styles.label}>
                        <div>
                            <Link onClick={getItemInfo} to={`/${route_type}/${props.id}`}>
                                <h1 className={`${styles.title} ${styles.title_3}`}>
                                    {props.title}
                                </h1>
                            </Link>
                            <p className={styles.tagline}>
                                {tagline}
                            </p>

                            <div className={styles.info}>
                                <div className={styles.rating}>
                                    <span className={styles.icon}>
                                        <StarRateRounded />
                                    </span>
                                    <h1>
                                        {rating}
                                    </h1>
                                </div>
                                <a href={`https://www.imdb.com/title/${imdbRating}`} target="_blank" rel='noreferrer'>
                                    <div className={styles.imdb}>
                                        <Imdb color='#F5C518' />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default SlideItem;
