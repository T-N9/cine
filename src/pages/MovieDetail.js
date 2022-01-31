import React, {useState, useEffect} from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const MovieDetail = () => {
    let { id } = useParams();
    const [getData, setGetData] = useState(null);
    const { loading, data, error } = useFetch(`http://api.themoviedb.org/3/movie/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos`);

    useEffect(() => {
        if (data != null) {
            setGetData(data)
        }
        // console.log(getData);
    });

    let title;
    if(getData != null) {
        title = getData.name ? getData.name : getData.original_title;
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
            <h1>
                {title}
            </h1>
        </div>
    );
}

export default MovieDetail;
