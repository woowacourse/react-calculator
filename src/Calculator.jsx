/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      result: '0',
    };
  }

  componentDidMount() {}

  handleClickDigit(i) {
    const currentNumber = this.state.result;

    if (currentNumber === '0' || currentNumber === '오류') {
      this.setState({ result: i });
      return;
    }
    this.setState(prevState => ({ result: prevState.result + i }));
  }

  handleClickOperation(operation) {
    const lastResult = this.state.result[this.state.result.length - 1];
    const numberReg = /^[0-9]+$/;
    const { result } = this.state;

    if (result === '오류') {
      return;
    }

    if (operation === '=') {
      if (numberReg.test(result)) {
        return;
      }
      if (['+', '-', 'X', '/'].includes(result[0])) {
        return;
      }
      if (['+', '-', 'X', '/'].includes(result[result.length - 1])) {
        return;
      }

      for (let i = 0; i < result.length; i += 1) {
        if (['+', '-', 'X', '/'].includes(result[i])) {
          const operator = result[i];
          const operand = result.split(operator);
          this.calculate(operand, operator);
          return;
        }
      }
    }

    // 마지막 입력값 연산자 중복 입력
    if (['+', '-', 'X', '/'].includes(lastResult)) {
      this.setState(preState => ({
        result: preState.result.substr(0, preState.result.length - 1) + operation,
      }));
      return;
    }

    // 연산자 2개 이상 추가되지 않도록
    if (!numberReg.test(result)) {
      return;
    }
    this.setState(preState => ({ result: preState.result + operation }));
  }

  handleClickModifier() {
    this.setState({ result: '0' });
  }

  calculate(operand, operator) {
    console.log(operand, operator);
    let result = null;
    switch (operator) {
      case '+':
        result = +operand[0] + +operand[1];
        break;
      case '-':
        result = +operand[0] - +operand[1];
        break;
      case 'X':
        result = +operand[0] * +operand[1];
        break;
      case '/':
        result = +operand[0] / +operand[1];
        break;
      default:
        break;
    }

    if (result === Infinity) {
      this.setState({ result: '오류' });
      return;
    }

    this.setState({ result: String(result) });
  }

  renderDigit(i) {
    return (
      <button className="digit" type="button" onClick={this.handleClickDigit.bind(this, i)}>
        {i}
      </button>
    );
  }

  renderModifier() {
    return (
      <button type="button" className="modifier" onClick={this.handleClickModifier.bind(this)}>
        AC
      </button>
    );
  }

  renderResult(result) {
    return <h1 id="total">{result}</h1>;
  }

  renderOperation(operation) {
    return (
      <button
        type="button"
        className="operation"
        onClick={this.handleClickOperation.bind(this, operation)}
      >
        {operation}
      </button>
    );
  }

  render() {
    return (
      <div className="calculator">
        {this.renderResult(this.state.result)}
        <div className="digits flex">
          {this.renderDigit('0')}
          {this.renderDigit('1')}
          {this.renderDigit('3')}
          {this.renderDigit('2')}
          {this.renderDigit('4')}
          {this.renderDigit('5')}
          {this.renderDigit('6')}
          {this.renderDigit('7')}
          {this.renderDigit('8')}
          {this.renderDigit('9')}
        </div>
        <div className="modifiers subgrid">{this.renderModifier()}</div>
        <div className="operations subgrid">
          {this.renderOperation('/')}
          {this.renderOperation('X')}
          {this.renderOperation('-')}
          {this.renderOperation('+')}
          {this.renderOperation('=')}
        </div>
      </div>
    );
  }
}
