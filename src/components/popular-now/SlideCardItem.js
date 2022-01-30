import React from 'react';
import styles from './styles/SlideCardItem.module.scss';

const SlideCardItem = (props) => {
    const genres = [
        {
        "id": 28,
        "name": "Action"
        },
        {
        "id": 12,
        "name": "Adventure"
        },
        {
        "id": 16,
        "name": "Animation"
        },
        {
        "id": 35,
        "name": "Comedy"
        },
        {
        "id": 80,
        "name": "Crime"
        },
        {
        "id": 99,
        "name": "Documentary"
        },
        {
        "id": 18,
        "name": "Drama"
        },
        {
        "id": 10751,
        "name": "Family"
        },
        {
        "id": 14,
        "name": "Fantasy"
        },
        {
        "id": 36,
        "name": "History"
        },
        {
        "id": 27,
        "name": "Horror"
        },
        {
        "id": 10402,
        "name": "Music"
        },
        {
        "id": 9648,
        "name": "Mystery"
        },
        {
        "id": 10749,
        "name": "Romance"
        },
        {
        "id": 878,
        "name": "Science Fiction"
        },
        {
        "id": 10770,
        "name": "TV Movie"
        },
        {
        "id": 53,
        "name": "Thriller"
        },
        {
        "id": 10752,
        "name": "War"
        },
        {
        "id": 37,
        "name": "Western"
        }
    ]
    return (
        <div className={styles.slide_card_item}>
            <div className={styles.wrapper}>
                <img 
                src={`https://www.themoviedb.org/t/p/original/${props.image}`} 
                alt={`${props.title} poster`} 
                className={styles.image}
                />
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        {props.title}
                    </h1>
                    <p className={styles.vote}>{props.vote_avg}</p>
                    {/* <p className={styles.date}>{props.release_date}</p> */}
                </div>
            </div>
        </div>
    );
}

export default SlideCardItem;
