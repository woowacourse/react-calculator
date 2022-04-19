import './App.css';
import React, { Component } from 'react';
import Calculator from './components/Calculator';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Calculator></Calculator>
      </div>
    );
  }
}
