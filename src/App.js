import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components';
import { HomePage, MovieDetail, SeriesDetail } from './pages';

const App = () => {

  return (
    <main>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/movies/:id" element={<MovieDetail/>}/>
        <Route path="/series/:id" element={<SeriesDetail/>}/>
      </Routes>
      
    </main>
  );
}

export default App;
