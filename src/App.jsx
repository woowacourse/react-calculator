import React, { Component } from 'react';

import './App.css';

import { MAX_DIGIT_LENGTH } from './constants';

class App extends Component {
  constructor() {
    super();
    this.calculation = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      X: (a, b) => a * b,
      '/': (a, b) => Math.floor(a / b),
    };
    this.initialState = {
      firstOperand: '0',
      secondOperand: '',
      operator: null,
      isError: false,
    };
    this.state = {
      ...(JSON.parse(localStorage.getItem('state')) || this.initialState),
    };
  }

  digitButtons = Array.from({ length: 10 }).map((val, index) => {
    const buttonNumber = 9 - index;
    return (
      <button key={buttonNumber} className="digit">
        {buttonNumber}
      </button>
    );
  });

  #handleBeforeUnload = (e) => {
    e.preventDefault();

    // chorme에서 confirm 추가를 위해서 필요
    e.returnValue = '';
  };

  componentDidMount() {
    window.localStorage.removeItem('state');

    window.addEventListener('beforeunload', this.#handleBeforeUnload);

    window.addEventListener('pagehide', () => {
      if (this.state.firstOperand !== '0' || this.state.operator) {
        window.localStorage.setItem('state', JSON.stringify(this.state));
      }

      window.removeEventListener('beforeunload', this.#handleBeforeUnload);
    });
  }

  #handleDigitClick = (e) => {
    if (e.target.className !== 'digit') return;
    const number = e.target.textContent;

    if (this.state.operator) {
      this.setState({
        secondOperand: this.#concatOperand(this.state.secondOperand, number),
      });

      return;
    }
    this.setState({
      firstOperand: this.#concatOperand(this.state.firstOperand, number),
    });
  };

  #concatOperand(currentOperand, number) {
    if (currentOperand && currentOperand.length >= MAX_DIGIT_LENGTH)
      return currentOperand;
    if (currentOperand === '0') return number;
    return currentOperand + number;
  }

  #handleOperatorClick = (e) => {
    if (!e.target.classList.contains('operation')) return;
    if (this.state.secondOperand) return;

    const operator = e.target.textContent;

    if (operator !== '=') {
      this.setState({
        operator: e.target.textContent,
      });

      return;
    }
  };

  #handleResultButton = () => {
    if (!this.state.secondOperand) return;

    this.#showResult();
  };

  #showResult() {
    const result = this.#calculate();

    if (result === Infinity) {
      this.setState({ ...this.initialState, isError: true });

      return;
    }

    this.setState({ ...this.initialState, firstOperand: String(result) });
  }

  #calculate() {
    const { operator, firstOperand, secondOperand } = this.state;
    if (!operator || !firstOperand || !secondOperand) {
      return;
    }

    const calc = this.calculation[operator];
    return calc(Number(firstOperand), Number(secondOperand));
  }

  #handleAllClear = () => {
    this.setState({
      firstOperand: '0',
      secondOperand: '',
      operator: null,
      isError: false,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="calculator">
          {this.state.isError ? (
            <h1 id="total">오류</h1>
          ) : (
            <h1 id="total">
              {this.state.firstOperand}
              {this.state.operator}
              {this.state.secondOperand}
            </h1>
          )}
          <div className="digits flex" onClick={this.#handleDigitClick}>
            {this.digitButtons}
          </div>
          <div className="modifiers subgrid">
            <button className="modifier" onClick={this.#handleAllClear}>
              AC
            </button>
          </div>
          <div
            className="operations subgrid"
            onClick={this.#handleOperatorClick}
          >
            <button className="operation">/</button>
            <button className="operation">X</button>
            <button className="operation">-</button>
            <button className="operation">+</button>
            <button
              className="operation result-button"
              onClick={this.#handleResultButton}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
