import React, { Component } from 'react';

import './App.css';

import AllClearButton from './components/AllClearButton';
import DigitButtons from './components/DigitButtons';
import OperationButtons from './components/OperationButtons';

const initialState = {
  firstOperand: '0',
  secondOperand: '',
  operator: null,
  isError: false,
};

class App extends Component {
  constructor() {
    super();

    this.state = JSON.parse(localStorage.getItem('state')) || { ...initialState };
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

  #triggerError = () => {
    this.setState({ ...initialState, isError: true });
  };

  #setOperandValue = (operand, value) => {
    this.setState({ [operand === 'first' ? 'firstOperand' : 'secondOperand']: value });
  };

  #setOperatorValue = (value) => {
    this.setState({ operator: value });
  };

  #clearState = () => {
    this.setState({ ...initialState });
  };

  #clearAndSetResultValue = (value) => {
    this.setState({ ...initialState, firstOperand: value });
  };

  render() {
    const { firstOperand, secondOperand, operator, isError } = this.state;

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
          <DigitButtons
            operator={operator}
            firstOperand={firstOperand}
            secondOperand={secondOperand}
            setOperand={this.#setOperandValue}
          />
          <AllClearButton clearState={this.#clearState} />
          <OperationButtons
            operator={operator}
            firstOperand={firstOperand}
            secondOperand={secondOperand}
            setOperator={this.#setOperatorValue}
            clearAndSetResult={this.#clearAndSetResultValue}
            triggerError={this.#triggerError}
          />
        </div>
      </div>
    );
  }
}

export default App;
