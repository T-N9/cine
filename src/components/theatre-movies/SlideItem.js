import React from 'react';
import styles from './styles/SlideItem.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';

const SlideItem = (props) => {

    let route_type = 'movies';

    const dispatch = useDispatch();
    const getItemInfo = () => {
        dispatch(setItemId(props.id));
        dispatch(setItemType('movie'));
    }

    return (
        <div className={styles.slide_item}
        style={{backgroundImage : `url(https://www.themoviedb.org/t/p/original/${props.backdrop_path})`}}
        >
            <Link onClick={getItemInfo} to={`/${route_type}/${props.id}`}>
                <div className={styles.overlay}>
                    <h1 className={`${styles.title} ${styles.title_1}`}>
                        {props.title}
                    </h1>
                    {/* <p className={styles.overview}>
                        {props.overview.slice(0,200)}
                    </p> */}
                </div>
            </Link>
        </div>
    );
}

export default SlideItem;
