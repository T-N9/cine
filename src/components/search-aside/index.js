import React from 'react';
import styles from './styles/SearchAside.module.scss';
import { useSelector , useDispatch} from 'react-redux';
import { setSearchActive } from '../../redux/searchActiveSlice';

const SearchAside = () => {

    const dispatch = useDispatch();
    const { movies, series } = useSelector((state) => state.searchResults);
    const { current } = useSelector((state) => state.searchActive);
    const resultCategories = [
        {
            name: "movies",
            qty: movies
        },
        {
            name: "series",
            qty: series
        },
    ];

    const handleSearchActive = (cate) => {
        dispatch(setSearchActive(cate))
    }

    const resultList = resultCategories.map(item => {
        return (
            <div onClick={() => handleSearchActive(item.name)} key={item.name} className={ current === item.name ? `${styles.category} ${styles.cate_active}` : `${styles.category}`}>
                <p>
                    {item.name}
                </p>

                <span className={styles.qty}>
                    {item.qty}
                </span>
            </div>
        )
    })

    return (
        <aside className={styles.search_aside}>
            <div className={`${styles.container_y_2} ${styles.result_flex}`}>
                {resultList}
            </div>
        </aside>
    );
}

export default SearchAside;
