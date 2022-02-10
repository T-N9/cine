import React from 'react';
import styles from './styles/DetailTrailer.module.scss';
import { Cancel } from '@mui/icons-material';

const DetailTrailer = (props) => {
    return (
        <div className={props.showTrailer ? `${styles.detail_trailer} ${styles.visible}` : `${styles.detail_trailer} ${styles.hidden}`}>
            <div className={styles.wrapper}>
                <button onClick={props.handleTrailer} 
                className={styles.cancel}>
                    <Cancel/>
                </button>
                {
                    props.trailer !== null ?
                    <iframe className={styles.detail_video} src={props.showTrailer ? `https://www.youtube.com/embed/${props.trailer}` : ``} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> :
                    <div className={styles.not_av}>
                        <h1>Trailer Not Found!</h1>
                    </div>
                }
                
            </div>
        </div>
    );
}

export default DetailTrailer;
