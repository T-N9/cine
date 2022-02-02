import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/SlideCardItem.module.scss';

const SlideCardItem = (props) => {

    let vote_border;
    if(props.vote_avg >= 7.5) {
        vote_border = '#21E6C1';
    } else if (props.vote_avg >= 6) {
        vote_border = '#f1d900';
    } else {
        vote_border = '#FF304F';
    }

    let media_type = props.media_type;
    let route_type = media_type === 'tv' ? 'series' : 'movies';
    return (
        <div className={styles.slide_card_item}>
            <Link to={`/${route_type}/${props.id}`}>
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
                        <p style={{'borderColor' : vote_border}} className={styles.vote}>{props.vote_avg}</p>
                        {/* <p className={styles.date}>{props.release_date}</p> */}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SlideCardItem;
