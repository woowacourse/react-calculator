import React, { Component } from 'react';

import './App.css';

import { DigitButtons, OperationButtons } from './components';

const initialState = {
  firstOperand: '0',
  secondOperand: '',
  operator: null,
  isError: false,
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      ...(JSON.parse(localStorage.getItem('state')) || initialState),
    };
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

  #handleParentState = (state) => {
    this.setState({ ...state });
  };

  #triggerError = () => {
    this.setState({ ...initialState, isError: true });
  };

  #handleAllClear = () => {
    this.setState({ ...initialState });
  };

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
          <DigitButtons state={this.state} handleParentState={this.#handleParentState} />
          <div className="modifiers subgrid">
            <button type="button" className="modifier" onClick={this.#handleAllClear}>
              AC
            </button>
          </div>
          <OperationButtons
            state={this.state}
            initialState={initialState}
            handleParentState={this.#handleParentState}
            triggerError={this.#triggerError}
          />
        </div>
      </div>
    );
  }
}

export default App;
