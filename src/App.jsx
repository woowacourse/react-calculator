/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Button from './components/Button';
import './App.css';

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
        'calculatorData',
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
    if (localStorage.getItem('calculatorData')) {
      const { firstOperand, secondOperand, operator, result, lastResult } =
        JSON.parse(localStorage.getItem('calculatorData'));

      this.setState({
        firstOperand,
        secondOperand,
        operator,
        result,
      });

      this.totalRef.current.textContent = lastResult ?? 0;
    }
  }

  componentDidUpdate() {
    console.log('update', this.state);
  }

  handleDigitClick = (e) => {
    const total = this.totalRef.current.textContent;
    const digit = e.target.textContent;

    const list = ['/', 'X', '-', '+'];

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

    const list = ['/', 'X', '-', '+'];
    if (list.includes(total)) {
      alert('2번째 피연산자를 입력해주세요.');

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

    if (operation === '=') {
      const { operator, firstOperand } = this.state;
      let result;

      switch (operator) {
        case '+':
          result = firstOperand + total;
          break;
        case '-':
          result = firstOperand - total;
          break;
        case 'X':
          result = firstOperand * total;
          break;
        case '/':
          result =
            total === 0 ? '오류' : Number((firstOperand / total).toFixed(2));
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
    const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    return (
      <>
        <h1>⚛️ React 계산기 🧮</h1>
        <div className="calculator">
          <h2 id="total" ref={this.totalRef}>
            0
          </h2>
          <div className="digits flex" onClick={this.handleDigitClick}>
            {numbers.map((number, index) => (
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
            <Button className="operation" text="/" />
            <Button className="operation" text="X" />
            <Button className="operation" text="-" />
            <Button className="operation" text="+" />
            <Button className="operation" text="=" />
          </div>
        </div>
      </>
    );
  }
}

export default App;
