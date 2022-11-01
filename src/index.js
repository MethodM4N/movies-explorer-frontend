import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import Favicon from 'react-favicon'
import favicon from './images/favicon.ico'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Favicon url={favicon} />
    <App />
  </BrowserRouter>
);

