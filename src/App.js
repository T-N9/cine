import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './helpers/ScrollToTop';
import { NavBar } from './components';
import { HomePage, MovieDetail, SeriesDetail, SearchResults, UpcomingMoviesPage, MoviePage } from './pages';

/* 
  Mother of all pages
  mainly route pages can be found.

  NavBar in all pages and 
  ScrollToTop to start at the very top of every page.
*/

const App = () => {
  return (
    <main>
      <NavBar/>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/movies/:id" element={<MovieDetail/>}/>
          <Route path="/series/:id" element={<SeriesDetail/>}/>

          <Route path={`/search/:query/`} element={<SearchResults/>}/>
          <Route path={`/search/:query/:page`} element={<SearchResults/>}/>

          <Route path={`/upcoming/`} element={<UpcomingMoviesPage/>}/>
          <Route path={`/upcoming/:page`} element={<UpcomingMoviesPage/>}/>

          <Route path={`/discover/movies/`} element={<MoviePage/>}/>
          <Route path={`/discover/movies/:type`} element={<MoviePage/>}/>
        </Routes>
      </ScrollToTop>
    </main>
  );
}

export default App;
