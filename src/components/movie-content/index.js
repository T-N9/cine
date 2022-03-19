import React from "react";
import styles from './styles/MovieContent.module.scss';

const MovieContent = () => {



    return(
        <section className={styles.movie_content}>
            <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                <h1>
                    movie contents are here
                </h1>
            </div>
        </section>
    )
}

export default MovieContent;