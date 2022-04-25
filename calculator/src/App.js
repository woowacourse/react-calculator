import { Component } from 'react';
import Calculator from './container/Calculator';
import './App.css';
export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Calculator />
      </div>
    );
  }
}
