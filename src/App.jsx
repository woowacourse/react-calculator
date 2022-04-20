import React, { Component } from 'react';

import './App.css';

import DigitButtons from './DigitButtons';

class App extends Component {
  #calculation;

  #operatorButtons;

  constructor() {
    super();

    this.#calculation = {
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

    this.#operatorButtons = Object.keys(this.#calculation).map((val) => (
      <button
        key={val}
        type="button"
        className="operation"
        onClick={this.#handleOperatorClick}
      >
        {val}
      </button>
    ));
  }

  componentDidMount() {
    window.localStorage.removeItem('state');

    window.addEventListener('beforeunload', this.#handleBeforeUnload);

    window.addEventListener('pagehide', () => {
      const { firstOperand, operator } = this.state;

      if (firstOperand !== '0' || operator) {
        window.localStorage.setItem('state', JSON.stringify(this.state));
      }

      window.removeEventListener('beforeunload', this.#handleBeforeUnload);
    });
  }

  #handleBeforeUnload = (e) => {
    e.preventDefault();

    // chorme에서 confirm 추가를 위해서 필요
    e.returnValue = '';
  };

  #handleAllClear = () => {
    this.setState({
      firstOperand: '0',
      secondOperand: '',
      operator: null,
      isError: false,
    });
  };

  #handleOperatorClick = ({ target }) => {
    if (!target.classList.contains('operation')) return;

    const { secondOperand } = this.state;
    if (secondOperand) return;

    const operator = target.textContent;

    if (operator !== '=') {
      this.setState({
        operator: target.textContent,
      });
    }
  };

  #handleResultButton = () => {
    const { secondOperand } = this.state;
    if (!secondOperand) return;

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

    const calc = this.#calculation[operator];
    return calc(Number(firstOperand), Number(secondOperand));
  }

  render() {
    const { isError, firstOperand, operator, secondOperand } = this.state;

    return (
      <div className="App">
        <div className="calculator">
          {isError ? (
            <h1 id="total">오류</h1>
          ) : (
            <h1 id="total">
              {firstOperand}
              {operator}
              {secondOperand}
            </h1>
          )}
          <div className="digits flex">
            <DigitButtons state={this.state} setState={this.setState} />
          </div>
          <div className="modifiers subgrid">
            <button type="button" className="modifier" onClick={this.#handleAllClear}>
              AC
            </button>
          </div>
          <div className="operations subgrid">
            {this.#operatorButtons}
            <button
              className="operation result-button"
              type="button"
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
