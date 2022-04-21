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
  constructor() {
    super();

    this.totalRef = React.createRef();
    this.state = {
      firstOperand: 0,
      secondOperand: 0,
      operator: '',
      result: 0,
    };

    window.addEventListener('beforeunload', this.handleBeforeUnload);
    window.addEventListener('unload', this.handleUnload);
  }

  componentDidMount() {
    if (storage.get(CALCULATOR_DATA_KEY)) {
      const { firstOperand, secondOperand, operator, result, lastResult } =
        storage.get(CALCULATOR_DATA_KEY);

      this.setState({
        firstOperand,
        secondOperand,
        operator,
        result,
      });

      this.totalRef.current.textContent = lastResult ?? 0;
    }
  }

  handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  handleUnload = () => {
    const lastResult = Number(this.totalRef.current.textContent);
    storage.set(CALCULATOR_DATA_KEY, { ...this.state, lastResult });
  };

  handleDigitClick = (e) => {
    const total = this.totalRef.current.textContent;
    const digit = e.target.textContent;

    if (isArithmeticOperator(total) || total === '0') {
      this.totalRef.current.textContent = digit;
      return;
    }

    this.totalRef.current.textContent += digit;
  };

  handleModifierClick = (e) => {
    this.initialize();
  };

  handleOperationClick = (e) => {
    const operation = e.target.textContent;
    const total = this.totalRef.current.textContent;

    try {
      validateOperatorIsDuplicated(total);
    } catch ({ message }) {
      alert(message);
      this.initialize();
      return;
    }

    if (operation === OPERATOR.EQUAL) {
      const { operator, firstOperand } = this.state;
      const result = this.calculate(operator, {
        firstOperand,
        total: Number(total),
      });

      this.totalRef.current.textContent = result;
      this.setState((state) => ({
        ...state,
        secondOperand: Number(total),
        result,
      }));

      return;
    }

    this.totalRef.current.textContent = operation;
    this.setState((state) => ({
      ...state,
      firstOperand: Number(total),
      operator: operation,
    }));
  };

  initialize() {
    this.totalRef.current.textContent = 0;
    this.setState({
      firstOperand: 0,
      secondOperand: 0,
      operator: '',
      result: 0,
    });
  }

  calculate(operator, { firstOperand, total }) {
    const operation = {
      [OPERATOR.PLUS]: () => firstOperand + total,
      [OPERATOR.MINUS]: () => firstOperand - total,
      [OPERATOR.MULTIPLY]: () => firstOperand * total,
      [OPERATOR.DIVIDE]: () =>
        total === 0 ? INFINITY_ERROR_TEXT : toFixedValue(firstOperand / total),
    };

    return operation[operator]();
  }

  render() {
    return (
      <>
        <h1>⚛️ React 계산기 🧮</h1>
        <div className="calculator">
          <h2 id="total" ref={this.totalRef}>
            0
          </h2>
          <div className="digits flex" onClick={this.handleDigitClick}>
            {CALCULATOR_NUMBER_LIST.map((number, index) => (
              <Button key={index} text={number} className="digit" />
            ))}
          </div>
          <div className="modifiers subgrid" onClick={this.handleModifierClick}>
            <Button className="modifier" text="AC" />
          </div>
          <div
            className="operations subgrid"
            onClick={this.handleOperationClick}
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
