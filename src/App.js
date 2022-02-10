import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './helpers/ScrollToTop';
import { NavBar } from './components';
import { HomePage, MovieDetail, SeriesDetail } from './pages';

const App = () => {

  return (
    <main>
      <NavBar/>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/movies/:id" element={<MovieDetail/>}/>
          <Route path="/series/:id" element={<SeriesDetail/>}/>
        </Routes>
      </ScrollToTop>
      
    </main>
  );
}

export default App;
