import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './helpers/ScrollToTop';
import { NavBar } from './components';
import { HomePage, MovieDetail, SeriesDetail, SearchResults, UpcomingMoviesPage } from './pages';

const App = () => {

  return (
    <main>
      <NavBar/>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/movies/:id" element={<MovieDetail/>}/>
          <Route path="/series/:id" element={<SeriesDetail/>}/>
          <Route path="/search/:query" element={<SearchResults/>}/>
          <Route path="/upcoming" element={<UpcomingMoviesPage/>}/>
        </Routes>
      </ScrollToTop>
      
    </main>
  );
}

export default App;
