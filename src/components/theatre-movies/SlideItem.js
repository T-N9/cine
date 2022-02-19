import React, { useEffect, useState } from 'react';
import styles from './styles/SlideItem.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';
import useFetch from '../../hooks/useFetch';
import { PlayCircleOutlineRounded } from '@mui/icons-material';

const SlideItem = (props) => {

    let route_type = 'movies';
    const [getData, setGetData] = useState(null);

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

    let tagline,
        poster_path;

    if (getData !== null) {
        tagline = data.tagline;
        poster_path = data.poster_path;
    }

    return (
        <>
            <div className={styles.slide_item}>
                <Link onClick={getItemInfo} to={`/${route_type}/${props.id}`}>
                    <div className={styles.slide_cover}
                        style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/original/${props.backdrop_path})` }}
                    >
                        <div className={styles.overlay}>
                            <PlayCircleOutlineRounded fontSize='large'/>
                        </div>
                        <div className={styles.bottom_overlay}>

                        </div>
                    </div>
                    <div className={styles.slide_content}>
                        <img className={styles.poster} src={`https://www.themoviedb.org/t/p/original/${poster_path}`} alt={props.title} />
                        <div className={styles.label}>
                            <h1 className={`${styles.title} ${styles.title_3}`}>
                                {props.title}
                            </h1>
                            <p className={styles.tagline}>
                                “ {tagline} ”
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default SlideItem;
