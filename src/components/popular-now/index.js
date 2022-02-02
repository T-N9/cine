import React, { useState } from 'react';
import styles from './styles/PopularNow.module.scss';
// import PopularSlider from './PopularSlider';
import SliderCom1 from '../slider-com-1';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const PopularNow = () => {
    const [tab, setTab] = useState('movies');

    const handleChange = (e, newTab) => {
        if(newTab !== null) {
            setTab(newTab)
        }
    };

    return (
        <section className={styles.popular_now}>
            <div className={`${styles.container_x_md} ${styles.container_y_3}`}>
                <h1 className={styles.title_2}>Popular Now</h1>
                <ToggleButtonGroup
                    color="primary"
                    value={tab}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton className={styles.toggle_button} value="movies">Movies</ToggleButton>
                    <ToggleButton className={styles.toggle_button} value="series">Series</ToggleButton>
                </ToggleButtonGroup>

                <div className={styles.popular_movies_series}>
                    <div className={styles.popular_wrapper}>
                        <div className={tab === 'movies' ? `${styles.slide_is_showed}` : `${styles.slide_is_hidden}`}>
                            <SliderCom1 type = 'movie'/>
                        </div>
                        <div className={tab === 'series' ? `${styles.slide_is_showed}` : `${styles.slide_is_hidden}`}>
                            <SliderCom1 type = 'tv'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PopularNow;
