import React, { useState } from 'react';
import styles from './styles/PopularNow.module.scss';
import PopularMovies from './PopularMovies';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';


const ToggleButtonBar = () => {
    const [tab, setTab] = useState('movies');

    const handleChange = (e, newTab) => {
        setTab(newTab);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={tab}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton className={styles.toggle_button} value="movies">Movies</ToggleButton>
            <ToggleButton className={styles.toggle_button} value="series">Series</ToggleButton>
        </ToggleButtonGroup>
    )
}

const PopularNow = () => {

    return (
        <section className={styles.popular_now}>
            <div className={`${styles.container_x_md} ${styles.container_y_3}`}>
                <h1 className={styles.title_2}>Popular Now</h1>
                <ToggleButtonBar/>

                <div className={styles.popular_movies}>
                    <div>
                        <div>
                            <PopularMovies/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PopularNow;
