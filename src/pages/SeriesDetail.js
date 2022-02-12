import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeLogoSmall, activeNavItem } from '../redux/navActiveSlice';
import { DetailHero, DetailCasts } from '../components';
import { setItemId, setItemType } from '../redux/detailMovieTVSlice';

const SeriesDetail = () => {
    let { item_id, item_type } = useSelector((state) => state.detail_movie_tv);
    const dispatch = useDispatch();
    let { id } = useParams();
    if(item_id === null) {
        item_id = id;
        item_type = 'tv';
        dispatch(setItemId(id));
        dispatch(setItemType('tv'));
    }

    useEffect(() => {
        dispatch(makeLogoSmall());
        dispatch(activeNavItem("series"))
    }, [dispatch]);

    let media_type = 'tv';

    return (
        <div>
            <DetailHero
                id = {item_id}
                media_type = {item_type}
            />
            <DetailCasts
                id = {item_id}
                media_type = {media_type}
            />
        </div>
    );
}

export default SeriesDetail;
