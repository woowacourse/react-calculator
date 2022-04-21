/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import Button from './components/Button';
import './App.css';

import storage from './storage/storage';
import {
  INFINITY_ERROR_TEXT,
  CALCULATOR_DATA_KEY,
  OPERATOR,
  CALCULATOR_NUMBER_LIST,
  CALCULATOR_OPERATOR_LIST,
} from './constants';
import {
  validateOperatorIsDuplicated,
  isArithmeticOperator,
  toFixedValue,
} from './utils';

class App extends Component {
  #expressionRef;

  constructor() {
    super();

    this.#expressionRef = React.createRef();
    this.state = {
      firstOperand: 0,
      secondOperand: 0,
      operator: '',
      calculationResult: 0,
    };

    window.addEventListener('beforeunload', this.#handleBeforeUnload);
    window.addEventListener('unload', this.#handleUnload);
  }

  componentDidMount() {
    if (storage.get(CALCULATOR_DATA_KEY)) {
      const {
        firstOperand,
        secondOperand,
        operator,
        calculationResult,
        lastExpression,
      } = storage.get(CALCULATOR_DATA_KEY);

      this.setState({
        firstOperand,
        secondOperand,
        operator,
        calculationResult,
      });

      this.#expressionRef.current.textContent = lastExpression ?? 0;
    }
  }

  #handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  #handleUnload = () => {
    const lastExpression = Number(this.#expressionRef.current.textContent);
    storage.set(CALCULATOR_DATA_KEY, { ...this.state, lastExpression });
  };

  #handleDigitClick = (e) => {
    const expression = this.#expressionRef.current.textContent;
    const digit = e.target.textContent;

    if (isArithmeticOperator(expression) || expression === '0') {
      this.#expressionRef.current.textContent = digit;
      return;
    }

    this.#expressionRef.current.textContent += digit;
  };

  #handleModifierClick = (e) => {
    this.#initialize();
  };

  #handleOperationClick = (e) => {
    const operation = e.target.textContent;
    const expression = this.#expressionRef.current.textContent;

    try {
      validateOperatorIsDuplicated(expression);
    } catch ({ message }) {
      alert(message);
      this.#initialize();
      return;
    }

    if (operation === OPERATOR.EQUAL) {
      const { operator, firstOperand } = this.state;
      const calculationResult = this.#calculate(operator, {
        firstOperand,
        secondOperand: Number(expression),
      });

      this.#expressionRef.current.textContent = calculationResult;
      this.setState((state) => ({
        ...state,
        secondOperand: Number(expression),
        calculationResult,
      }));

      return;
    }

    this.#expressionRef.current.textContent = operation;
    this.setState((state) => ({
      ...state,
      firstOperand: Number(expression),
      operator: operation,
    }));
  };

  #initialize() {
    this.#expressionRef.current.textContent = 0;
    this.setState({
      firstOperand: 0,
      secondOperand: 0,
      operator: '',
      calculationResult: 0,
    });
  }

  #calculate(operator, { firstOperand, secondOperand }) {
    const operation = {
      [OPERATOR.PLUS]: () => firstOperand + secondOperand,
      [OPERATOR.MINUS]: () => firstOperand - secondOperand,
      [OPERATOR.MULTIPLY]: () => firstOperand * secondOperand,
      [OPERATOR.DIVIDE]: () =>
        secondOperand === 0
          ? INFINITY_ERROR_TEXT
          : toFixedValue(firstOperand / secondOperand),
    };

    return operation[operator]();
  }

  render() {
    return (
      <>
        <h1>⚛️ React 계산기 🧮</h1>
        <div className="calculator">
          <h2 id="expression" ref={this.#expressionRef}>
            0
          </h2>
          <div className="digits flex" onClick={this.#handleDigitClick}>
            {CALCULATOR_NUMBER_LIST.map((number, index) => (
              <Button key={index} text={number} className="digit" />
            ))}
          </div>
          <div
            className="modifiers subgrid"
            onClick={this.#handleModifierClick}
          >
            <Button className="modifier" text="AC" />
          </div>
          <div
            className="operations subgrid"
            onClick={this.#handleOperationClick}
          >
            {CALCULATOR_OPERATOR_LIST.map((operator, index) => (
              <Button key={index} className="operation" text={operator} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;
