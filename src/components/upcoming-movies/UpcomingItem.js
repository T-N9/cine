import React from 'react';
import styles from './styles/UpcomingItem.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';

const UpcomingItem = (props) => {

    let route_type = 'movies';

    const dispatch = useDispatch();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getItemInfo = () => {
        dispatch(setItemId(props.id));
        dispatch(setItemType('movie'));
    }
    let dateSplit = props.release_date.split('-');

    let mono_month;
    if(dateSplit[1].split('')[0] === '0' ) {
        mono_month = parseInt(dateSplit[1][1]);
    }else{
        mono_month = dateSplit[1];
    }

    let day = dateSplit[2];
    let month = months[mono_month-1];
    let year = dateSplit[0];

    let releasedDate = `${month} ${day} ${year}`

    return (
        <div className={styles.upcoming_item}>
            <div className={styles.wrapper}>
                <div className={styles.poster}>
                    <img src={`https://www.themoviedb.org/t/p/w185/${props.poster_path}`} alt={`${props.title} poster`} />
                </div>
                <div className={styles.content}>
                    <Link onClick={getItemInfo} to={`/${route_type}/${props.id}`}>
                        <h1>
                            { props.title }
                        </h1>

                        <p className={styles.released_date}>
                            { releasedDate }
                        </p>
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
