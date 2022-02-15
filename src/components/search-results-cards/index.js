import React from 'react';
import styles from './styles/SearchResultCard.module.scss';
import { PhotoTwoTone } from '@mui/icons-material';

const SearchResultCard = (props) => {
    return (
        <div className={styles.search_result_card}>
            <div className={styles.image_wrapper}>
                {
                    props.image !== null ?
                    <img
                        src={`https://www.themoviedb.org/t/p/original/${props.image}`} 
                        alt={`${props.title} poster`} 
                        className={styles.image}
                    /> :
                    <div className={`${styles.image} ${styles.dummy}`}>
                        <PhotoTwoTone/>
                    </div>

                }
                
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    {props.title ? props.title : props.name}
                </h1>
            </div>
        </div>
    );
}

export default SearchResultCard;
