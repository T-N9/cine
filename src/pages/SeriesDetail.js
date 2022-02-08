import React, {useState, useEffect} from 'react';
// import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { DetailHero, DetailCasts } from '../components';
import { getDetailSeries } from '../redux/detailSerieSlice';

const SeriesDetail = () => {
    
    let { id } = useParams();
    const [getData, setGetData] = useState(null);
    // const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/tv/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases,content_ratings`);
    const { list , status } = useSelector((state) => state.detail_series)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetailSeries( {id : id}))
        setGetData(list);
        dispatch(makeLogoSmall());
        // console.log(getData);
    }, [ dispatch]);

    let title, 
    backdrop_path, 
    poster_path , 
    content_rating_US,
    content_rating,
    genres = [],
    first_air_date,
    episode_run_time,
    overview,
    rating,
    popularity,
    s_status,
    tagline,
    trailer,
    media_type;

    if(getData !== null) {
        title = list.name ? list.name : list.original_title;
        backdrop_path = list.backdrop_path;
        poster_path = list.poster_path;
        content_rating_US = list.content_ratings.results.filter(item => {
            return(item.iso_3166_1 === "US")
        });
        content_rating=content_rating_US[0].rating;
        list.genres.map(item => {
            return (
                genres.push(item.name)
            )
        });
        first_air_date = list.first_air_date;
        episode_run_time = list.episode_run_time;
        overview = list.overview;
        rating = list.vote_average;
        popularity = list.popularity;
        s_status = list.status;
        tagline= list.tagline;
        trailer = list.videos.results[0].key;
        media_type = 'tv';
    }

    if (status === 'loading') return (
        <section>
            <CircularProgress/>
        </section>
    );
    if (status === 'failed') return (
        <section>
            <h1>⚠️ Error getting resources! ⚠️</h1>
        </section>
    );

    return (
        <div>
            <DetailHero
                title = {title}
                backdrop_path = {backdrop_path}
                poster_path = {poster_path}
                content_rating = {content_rating}
                genres = {genres}
                first_air_date = {first_air_date}
                episode_run_time = {episode_run_time}
                overview = {overview}
                rating = {rating}
                popularity = {popularity}
                status = {s_status}
                tagline = {tagline}
                trailer = {trailer}
            />
            <DetailCasts
                id = {id}
                media_type = {media_type}
            />
        </div>
    );
}

export default SeriesDetail;
