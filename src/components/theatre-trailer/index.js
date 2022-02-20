import React from 'react';
import styles from './styles/TheatreTrailer.module.scss';
import { CancelSharp } from '@mui/icons-material';

const TheatreTrailer = (props) => {
    return (
        <div className={props.showTrailer ? `${styles.trailer_wrapper} ${styles.d_block}` : `${styles.d_none}`}>
            <button onClick={props.handleTrailer} 
                className={styles.cancel}>
                    <CancelSharp/>
                </button>
            {
                props.trailer !== null ?
                <iframe className={styles.trailer_video} src={props.showTrailer ? `https://www.youtube.com/embed/${props.trailer}` : ``} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> :
                <div className={styles.not_av}>
                    <h1>Trailer Not Found!</h1>
                </div>
            }
        </div>
    );
}

export default TheatreTrailer;
