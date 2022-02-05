import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/SlideItem.module.scss'
import { Button } from '@mui/material';

const SlideItem = (props) => {
    let media_type = props.media_type;
    let route_type = media_type === 'tv' ? 'series' : 'movies';

    return (
        <div className={styles.slide_item} style={{backgroundImage : `url(https://www.themoviedb.org/t/p/original/${props.backdrop_path})`}}>
            <div className={`${styles.container_x_md} ${styles.slide_wrapper}`}>
                <div className={styles.slide_content}>
                    <p className={styles.top_list}>Top {props.index+1} on board</p>
                    <h1 className={styles.title_1}>
                        {props.title ? props.title : props.name}
                    </h1>

                    <p className={styles.overview}>
                    {props.overview}
                    </p>

                    <Link to={`/${route_type}/${props.id}`}>
                        <Button variant='contained' className={styles.button}>
                            View Detail
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SlideItem;
