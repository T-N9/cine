import React, {useState, useEffect} from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { DetailHero } from '../components';

const SeriesDetail = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [getData, setGetData] = useState(null);
    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/tv/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases,content_ratings`);

    useEffect(() => {
        if (data != null) {
            setGetData(data)
        }
        dispatch(makeLogoSmall());
        // console.log(getData);
    }, [data, dispatch]);

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
    status,
    tagline,
    trailer;

    if(getData != null) {
        title = getData.name ? getData.name : getData.original_title;
        backdrop_path = getData.backdrop_path;
        poster_path = getData.poster_path;
        content_rating_US = getData.content_ratings.results.filter(item => {
            return(item.iso_3166_1 === "US")
        });
        content_rating=content_rating_US[0].rating;
        getData.genres.map(item => {
            return (
                genres.push(item.name)
            )
        });
        first_air_date = getData.first_air_date;
        episode_run_time = getData.episode_run_time;
        overview = getData.overview;
        rating = getData.vote_average;
        popularity = getData.popularity;
        status = getData.status;
        tagline= getData.tagline;
        trailer = getData.videos.results[0].key;
    }

    if (loading) return (
        <section>
            <CircularProgress/>
        </section>
    );
    if (error) return (
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
                status = {status}
                tagline = {tagline}
                trailer = {trailer}
            />
        </div>
    );
}

export default SeriesDetail;
