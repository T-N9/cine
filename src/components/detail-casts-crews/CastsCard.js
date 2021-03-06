import React from 'react';
import styles from './styles/CastsCard.module.scss';
import { Person } from '@mui/icons-material';

const CastsCard = (props) => {
    return (
        <div className={styles.card_wrapper}>
            { props.profile_path !== null ? 
            <img className={styles.cast_img} src={props.image} alt={`${props.name}`} /> :
            <div className={styles.placeholder}>
                <Person/>
            </div>
            }
            
            <div className={styles.content}>
                <p className={styles.name}>{props.name}</p>
                <p className={styles.character}>{props.character}</p>
            </div>
        </div>
    );
}

export default CastsCard;
