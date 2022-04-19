import './App.css';
import React, { Component } from 'react';
import DigitButton from './components/DigitButton';

class App extends Component {
  // for error
  componentDidMount() {}

  render() {
    return (
      <div className="calculator">
        <h1 id="total">0</h1>
        <div className="digits flex">
          <DigitButton number="9" />
          <DigitButton number="8" />
          <DigitButton number="7" />
          <DigitButton number="6" />
          <DigitButton number="5" />
          <DigitButton number="4" />
          <DigitButton number="3" />
          <DigitButton number="2" />
          <DigitButton number="1" />
          <DigitButton number="0" />
        </div>
        <div className="modifiers subgrid">
          <button type="button" className="modifier">
            AC
          </button>
        </div>
        <div className="operations subgrid">
          <button type="button" className="operation">
            /
          </button>
          <button type="button" className="operation">
            X
          </button>
          <button type="button" className="operation">
            -
          </button>
          <button type="button" className="operation">
            +
          </button>
          <button type="button" className="operation">
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
