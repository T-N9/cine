import React from 'react';
import styles from './styles/UpcomingItem.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';

const UpcomingItem = (props) => {

    let route_type = 'movies';

    const dispatch = useDispatch();

    const getItemInfo = () => {
        dispatch(setItemId(props.id));
        dispatch(setItemType('movie'));
    }
    return (
        <div className={styles.upcoming_item}>
            <div className={styles.wrapper}>
                <div className={styles.poster}>
                    <img src={`https://www.themoviedb.org/t/p/original/${props.poster_path}`} alt={`${props.title} poster`} />
                </div>
                <div className={styles.content}>
                    <Link onClick={getItemInfo} to={`/${route_type}/${props.id}`}>
                        <h1>
                            { props.title }
                        </h1>
                    </Link>
                    

                    <p>
                        {props.overview}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UpcomingItem;
