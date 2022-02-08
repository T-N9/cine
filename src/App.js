import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components';
import { HomePage, MovieDetail, SeriesDetail } from './pages';
import { useDispatch } from 'react-redux';
import { getTrendingAll } from './redux/trendingAllSlice';
import { getDetailMovie } from './redux/detailMovieSlice';
import { getDetailSeries } from './redux/detailSerieSlice';


const App = () => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTrendingAll({type : 'all'}));
    dispatch(getDetailMovie({ id : 123}));
    dispatch(getDetailSeries({ id : 108978}))
    
  }, [dispatch])

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
