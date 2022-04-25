import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from './Calculator';
import './scss/style.scss';

const $root = document.getElementById('root');
$root && ReactDOM.createRoot($root).render(<Calculator />);
