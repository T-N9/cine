import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbData = createApi({
    reducerPath : "movie",
    baseQuery : fetchBaseQuery({
        baseUrl: `https://api.themoviedb.org/3/`
    }),
    endpoints : (builder) => ({
        getDetailMovie : builder.query({
            query: (id) => `movie/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases`
        }),
        getCasts : builder.query({
            query: ({media_type,id}) => `${media_type}/${id}/credits?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US`
        })
    })
});

export const { useGetDetailMovieQuery, useGetCastsQuery } = tmdbData;


// https://api.themoviedb.org/3/movie/${id}?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&append_to_response=videos,releases