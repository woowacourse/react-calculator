import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Calculator from './components/Calculator';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator></Calculator>
  </React.StrictMode>,
);
