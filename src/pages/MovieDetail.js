import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailHero, DetailCasts, DetailTorrent } from '../components';
import { makeLogoSmall, activeNavItem } from '../redux/navActiveSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setItemId, setItemType } from '../redux/detailMovieTVSlice';

const MovieDetail = () => {

    let { item_id, item_type, imdb_id, movie_name } = useSelector((state) => state.detail_movie_tv);
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

    let media_type = 'movie';

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

            <DetailTorrent
                imdb_id = {imdb_id}
                movie_name = {movie_name}
            />
        </>
    );
}

export default MovieDetail;
