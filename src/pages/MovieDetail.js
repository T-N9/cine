import React, {useState, useEffect} from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { DetailHero } from '../components';
import { makeLogoSmall } from '../redux/navActiveSlice';
import { useDispatch } from 'react-redux';

const MovieDetail = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [getData, setGetData] = useState(null);
    const { loading, data, error } = useFetch(`https://api.themoviedb.org/3/movie/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases`);

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
    release_date,
    runtime;

    if(getData != null) {
        title = getData.name ? getData.name : getData.original_title;
        backdrop_path = getData.backdrop_path;
        poster_path = getData.poster_path;
        content_rating_US = getData.releases.countries.filter(item => {
            return(item.iso_3166_1 === "US")
        });
        content_rating=content_rating_US[content_rating_US.length - 1].certification;
        getData.genres.map(item => {
            return (
                genres.push(item.name)
            )
        });
        release_date = getData.release_date;
        runtime = getData.runtime;
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
        <>
            <DetailHero
                title = {title}
                backdrop_path = {backdrop_path}
                poster_path = {poster_path}
                content_rating = {content_rating}
                genres = {genres}
                release_date = {release_date}
                runtime = {runtime}
            />
        </>
    );
}

export default MovieDetail;
