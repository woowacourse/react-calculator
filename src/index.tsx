import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from './Calculator';
import './scss/style.scss';

const $root = document.getElementById('root');
if ($root) {
  const root = ReactDOM.createRoot($root);
  root.render(<Calculator />);
}
