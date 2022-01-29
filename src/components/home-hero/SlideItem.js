import React from 'react';
import styles from './styles/SlideItem.module.scss'
import { Button } from '@mui/material';

const SlideItem = (props) => {
    return (
        <div className={styles.slide_item} style={{backgroundImage : `url(https://www.themoviedb.org/t/p/original/${props.backdrop_path})`}}>
            <div className={`${styles.container_x_md} ${styles.slide_wrapper}`}>
                <div className={styles.slide_content}>
                    <p>Top {props.index+1} on board</p>
                    <h1 className={styles.title_1}>
                        {props.title ? props.title : props.name}
                    </h1>

                    <p className={styles.overview}>
                    {props.overview}
                    </p>

                    <Button variant='contained' className={styles.button}>
                        View Detail
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SlideItem;
