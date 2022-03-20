import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';

/* 
  React Router applied
  Redux store applied
*/

ReactDOM.render(
  // render(
   <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
   </HelmetProvider>,
  document.getElementById('root')
);
