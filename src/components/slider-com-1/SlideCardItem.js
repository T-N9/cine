import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/SlideCardItem.module.scss';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';

const SlideCardItem = (props) => {

    let vote_border;
    if(props.vote_avg >= 7.5) {
        vote_border = '#21E6C1';
    } else if (props.vote_avg >= 6) {
        vote_border = '#f1d900';
    } else if (props.vote_avg > 0){
        vote_border = '#FF304F';
    } else {
        vote_border = '#ffffffb4';
    }

    let media_type = props.media_type;
    let route_type = media_type === 'tv' ? 'series' : 'movies';

    const dispatch = useDispatch();
    const getItemInfo = () => {
        dispatch(setItemId(props.id));
        dispatch(setItemType(media_type));
    }
    return (
        <div className={styles.slide_card_item}>
            <Link onClick={getItemInfo} to={`/${route_type}/${props.id}`}>
                <div className={styles.wrapper}>
                    <img 
                    src={`https://www.themoviedb.org/t/p/original/${props.image}`} 
                    alt={`${props.title} poster`} 
                    className={styles.image}
                    />
                    <div className={styles.content}>
                        <h1 className={styles.title}>
                            {props.title ? props.title : props.name}
                        </h1>
                        <p style={{'borderColor' : vote_border}} className={styles.vote}>
                            {props.vote_avg === 0 ? "NR" : props.vote_avg}
                        </p>
                        {/* <p className={styles.date}>{props.release_date}</p> */}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SlideCardItem;
