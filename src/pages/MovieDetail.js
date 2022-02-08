import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { DetailHero, DetailCasts } from '../components';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailMovie } from '../redux/detailMovieSlice';

const MovieDetail = () => {
    
    let { id } = useParams();
    const [getData, setGetData] = useState(null);
    const { list, status } = useSelector((state) => state.detail_movie);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailMovie({ id : id }));
        setGetData(list);
        dispatch(makeLogoSmall());
    }, [dispatch]);

    let title, 
    backdrop_path, 
    poster_path , 
    content_rating_US,
    content_rating,
    genres = [],
    release_date,
    runtime,
    overview,
    rating,
    popularity,
    m_status,
    tagline,
    trailer,
    media_type;

    if(getData !== null) {
        title = list.name ? list.name : list.original_title;
        backdrop_path = list.backdrop_path;
        poster_path = list.poster_path;
        content_rating_US = list.releases.countries.filter(item => {
            return(item.iso_3166_1 === "US")
        });
        content_rating=content_rating_US[content_rating_US.length - 1].certification;
        list.genres.map(item => {
            return (
                genres.push(item.name)
            )
        });
        release_date = list.release_date;
        runtime = list.runtime;
        overview = list.overview;
        rating = list.vote_average;
        popularity = list.popularity;
        m_status = list.status;
        tagline= list.tagline;
        trailer = list.videos.results[0].key;
        media_type = "movie";
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
        <>
            <DetailHero
                title = {title}
                backdrop_path = {backdrop_path}
                poster_path = {poster_path}
                content_rating = {content_rating}
                genres = {genres}
                release_date = {release_date}
                runtime = {runtime}
                overview = {overview}
                rating = {rating}
                popularity = {popularity}
                status = {m_status}
                tagline = {tagline}
                trailer = {trailer}
                
            />
            <DetailCasts
                id = {id}
                media_type = {media_type}
            />
        </>
    );
}

export default MovieDetail;
