import React, { Component } from 'react';
import './App.css';
import Digits from './components/digits.jsx';

class App extends Component {
  state = {
    operation: '',
    firstNumber: '',
    secondNumber: '',
  };

  handleDigit = (number) => {
    if (this.state.operation) {
      this.setState({
        secondNumber:
          this.state.secondNumber.length === 3
            ? this.state.secondNumber
            : this.state.secondNumber + number,
      });
      return;
    }
    this.setState({
      firstNumber:
        this.state.firstNumber.length === 3
          ? this.state.firstNumber
          : this.state.firstNumber + number,
    });
  };

  render() {
    return (
      <div id="app">
        <div className="calculator">
          <h1 id="total">0</h1>
          <Digits handleDigit={this.handleDigit} />
          <div className="modifiers subgrid">
            <button className="modifier">AC</button>
          </div>
          <div className="operations subgrid">
            <button className="operation">/</button>
            <button className="operation">X</button>
            <button className="operation">-</button>
            <button className="operation">+</button>
            <button className="operation">=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
