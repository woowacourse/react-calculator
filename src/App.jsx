/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Button from './components/Button';
import './App.css';
import {
  EMPTY_SECOND_OPERAND_ERROR_MESSAGE,
  INFINITY_ERROR_TEXT,
  CALCULATOR_DATA_KEY,
  OPERATOR,
  FIXED_POINT_LENGTH,
  CALCULATOR_NUMBER_LIST,
  CALCULATOR_OPERATOR_LIST,
} from './constants';

class App extends Component {
  constructor() {
    super();

    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });

    window.addEventListener('unload', () => {
      const lastResult = Number(this.totalRef.current.textContent);

      localStorage.setItem(
        CALCULATOR_DATA_KEY,
        JSON.stringify({ ...this.state, lastResult })
      );
    });

    this.totalRef = React.createRef();
    this.state = {
      firstOperand: 0,
      secondOperand: 0,
      operator: '',
      result: 0,
    };
  }

  componentDidMount() {
    if (localStorage.getItem(CALCULATOR_DATA_KEY)) {
      const { firstOperand, secondOperand, operator, result, lastResult } =
        JSON.parse(localStorage.getItem(CALCULATOR_DATA_KEY));

      this.setState({
        firstOperand,
        secondOperand,
        operator,
        result,
      });

      this.totalRef.current.textContent = lastResult ?? 0;
    }
  }

  handleDigitClick = (e) => {
    const total = this.totalRef.current.textContent;
    const digit = e.target.textContent;

    const list = [
      OPERATOR.DIVIDE,
      OPERATOR.MULTIPLY,
      OPERATOR.MINUS,
      OPERATOR.PLUS,
    ];

    if (list.includes(total)) {
      this.totalRef.current.textContent = digit;
      return;
    }

    if (total === '0') {
      this.totalRef.current.textContent = digit;
      return;
    }

    this.totalRef.current.textContent += digit;
  };

  handleModifierClick = (e) => {
    this.totalRef.current.textContent = 0;

    this.setState({
      firstOperand: 0,
      secondOperand: 0,
      operator: '',
      result: 0,
    });
  };

  handleOperationClick = (e) => {
    const operation = e.target.textContent;
    let total = this.totalRef.current.textContent;

    const list = [
      OPERATOR.DIVIDE,
      OPERATOR.MULTIPLY,
      OPERATOR.MINUS,
      OPERATOR.PLUS,
    ];

    if (list.includes(total)) {
      alert(EMPTY_SECOND_OPERAND_ERROR_MESSAGE);

      this.totalRef.current.textContent = 0;

      this.setState({
        firstOperand: 0,
        secondOperand: 0,
        operator: '',
        result: 0,
      });

      return;
    }

    total = Number(total);

    if (operation === OPERATOR.EQUAL) {
      const { operator, firstOperand } = this.state;
      let result;

      switch (operator) {
        case OPERATOR.PLUS:
          result = firstOperand + total;
          break;
        case OPERATOR.MINUS:
          result = firstOperand - total;
          break;
        case OPERATOR.MULTIPLY:
          result = firstOperand * total;
          break;
        case OPERATOR.DIVIDE:
          result =
            total === 0
              ? INFINITY_ERROR_TEXT
              : Number((firstOperand / total).toFixed(FIXED_POINT_LENGTH));
          break;
        default:
          break;
      }

      this.totalRef.current.textContent = result;

      this.setState((state) => ({
        ...state,
        secondOperand: total,
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
            {CALCULATOR_OPERATOR_LIST.map((operator) => (
              <Button className="operation" text={operator} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;
