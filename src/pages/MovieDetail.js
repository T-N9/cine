import React, { useEffect } from 'react';
import styles from '../Pages.module.scss';
import { useParams } from 'react-router-dom';
import { DetailHero, DetailCasts, DetailInfo, DetailImages, DetailVideos , DetailRecommend , Footer } from '../components';
import { makeLogoSmall, activeNavItem } from '../redux/navActiveSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setItemId, setItemType } from '../redux/detailMovieTVSlice';

const MovieDetail = () => {

    let { item_id, item_type } = useSelector((state) => state.detail_movie_tv);
    const dispatch = useDispatch();
    let { id } = useParams();
    if(item_id === null) {
        item_id = id;
        dispatch(setItemId(id));
        dispatch(setItemType('movie'));
    }

    useEffect(() => {
        dispatch(makeLogoSmall());
        dispatch(activeNavItem("movies"));
    }, [ dispatch]);

    const media_type = 'movie';

    return (
        <>
            <DetailHero
                id = {item_id}
                media_type = {item_type}
            />

            <DetailCasts
                id = {item_id}
                media_type = {media_type}
            />

            <div className={`${styles.flex_media} ${styles.container_x_md} ${styles.container_y_2}`}>
                <div className={styles.media_wrapper}>
                    <DetailImages
                        id = {item_id}
                        media_type = {media_type}
                    />
                    <DetailVideos
                        id = {item_id}
                        media_type = {media_type}
                    />
                </div>
                <DetailInfo
                    id = {item_id}
                    media_type = {media_type}
                />
            </div>
            <DetailRecommend
                id = {item_id}
                media_type = {media_type}
            />
            <Footer/>
        </>
    );
}

export default MovieDetail;
