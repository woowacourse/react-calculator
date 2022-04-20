import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from './Calculator';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);

window.addEventListener('beforeunload', function (event) {
  event.returnValue = '';
});
