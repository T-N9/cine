import React, { useState, useEffect } from 'react';
import styles from './styles/DetailRecommend.module.scss';
import { useDispatch } from 'react-redux';
import { setItemId, setItemType } from '../../redux/detailMovieTVSlice';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const DetailRecommend = (props) => {

    const [ getData, setGetData ] = useState(null);
    const { data } = useFetch(`https://api.themoviedb.org/3/${props.media_type}/${props.id}/recommendations?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`);

    useEffect(() => {
        if(data !== null) {
            setGetData(data)
        }
    }, [data]);

    let recommend, recommendList;
    const dispatch = useDispatch();
    let route_type = props.media_type === 'tv' ? 'series' : 'movies';

    const getItemInfo = (id) => {
        dispatch(setItemId(id));
        dispatch(setItemType(props.media_type));
    }

    if(getData !== null) {
        if(getData.results.length >= 10) {
            recommend = getData.results.slice(0,8);
        }else {
            recommend = getData.results;
        }

        recommendList = recommend.map(item => {
            return (
                <div key={item.id} className={styles.recommend_item}>
                    <Link onClick={() => getItemInfo(item.id)} to={`/${route_type}/${item.id}`}>
                        <img className={styles.image} src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${item.backdrop_path}`} alt={item.name} />
                        
                        <div className={styles.content}>
                            <h1 className={styles.title}>
                                {item.title ? item.title : item.name}
                            
                            </h1>
                            <h1 className={styles.vote}>
                                {item.vote_average.toFixed(1)}
                            </h1>
                        </div>
                    </Link>
                </div>
            )
        });

        if(recommend.length === 0) {
            recommendList = null;
        }
    }


    return (
        <>
            <section className={styles.recommend_section}>
                <div className={`${styles.container_y_2} ${styles.container_x_md}`}>
                    <h1 className={styles.title_2}>
                        Recommended
                        { props.media_type === 'movie' ? ' Movies' : ' Shows'}
                    </h1>
                    <div className={styles.recommend_wrapper}>
                        { recommendList === null ? <p>No recommendations for now.</p> : recommendList }
                    </div>
                </div>
            </section>   
        </>
    );
}

export default DetailRecommend;
