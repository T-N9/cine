import React from 'react';
import styles from './styles/SearchHeader.module.scss';

const SearchHeader = (props) => {

    return (
        <section className={styles.search_header}>
            <div className={`${styles.container_x_md} ${styles.container_y_1}`}>
                <h1> Results for “{props.query}”.</h1>
            </div>
        </section>
    );
}

export default SearchHeader;
