/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

export default class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      result: '0',
      operand: ['0', ''],
      operator: '',
      index: 0,
    };

    window.addEventListener('beforeunload', e => {
      e.preventDefault();
      e.returnValue = '';
    });
  }

  componentDidMount() {
    const localState = JSON.parse(localStorage.getItem('state'));

    if (localState) {
      this.setState({ result: localState.result });
      this.setState({ operand: localState.operand });
      this.setState({ operator: localState.operator });
      this.setState({ index: localState.index });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  handleClickDigit(digit) {
    if (+(this.state.operand[this.state.index] + digit) >= 1000) {
      alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다.');
      return;
    }

    switch (this.state.index) {
      case 0:
        this.setState(prevState => ({
          operand: [String(+(prevState.operand[0] + digit)), ''],
        }));
        break;

      case 1:
        this.setState(prevState => ({
          operand: [String(+prevState.operand[0]), String(+(prevState.operand[1] + digit))],
        }));
        break;

      default:
        break;
    }

    if (this.state.result === '0' || this.state.result === '오류') {
      this.setState({ result: digit });
      return;
    }
    this.setState(prevState => ({ result: prevState.result + digit }));
  }

  handleClickOperation(operator) {
    const numberReg = /^[0-9]+$/;
    const { result } = this.state;
    const lastResult = result[result.length - 1];

    if (result === '오류') {
      return;
    }

    if (operator === '=') {
      if (numberReg.test(result)) {
        return;
      }
      if (['+', 'X', '/'].includes(result[0])) {
        return;
      }
      if (['+', '-', 'X', '/'].includes(lastResult)) {
        return;
      }

      this.calculate(this.state.operand, this.state.operator);
      return;
    }

    // 마지막 입력값 연산자 중복 입력
    if (['+', '-', 'X', '/'].includes(lastResult)) {
      this.setState(preState => ({
        result: preState.result.substr(0, preState.result.length - 1) + operator,
      }));
      return;
    }

    // 연산자 2개 이상 추가되지 않도록
    if (this.state.operator) {
      return;
    }
    this.setState(preState => ({ result: preState.result + operator }));
    this.setState({ operator });
    this.setState({ index: 1 });
  }

  handleClickModifier() {
    this.setState({ result: '0' });
    this.setState({ operand: ['0', ''] });
    this.setState({ operator: '' });
    this.setState({ index: 0 });
  }

  calculate(operand, operator) {
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
        result = Math.floor(+operand[0] / +operand[1]);
        break;
      default:
        break;
    }

    if (result === Infinity) {
      this.setState({ result: '오류' });
      return;
    }

    this.setState({ result });
    this.setState({ operand: [String(result), ''] });
    this.setState({ operator: '' });
    this.setState({ index: 0 });
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

  renderResult() {
    return (
      <h1 id="total">
        {this.state.operand[0]}
        {this.state.operator}
        {this.state.operand[1]}
      </h1>
    );
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
        {this.renderResult()}
        <div className="digits flex">
          {this.renderDigit('9')}
          {this.renderDigit('8')}
          {this.renderDigit('7')}
          {this.renderDigit('6')}
          {this.renderDigit('5')}
          {this.renderDigit('4')}
          {this.renderDigit('3')}
          {this.renderDigit('2')}
          {this.renderDigit('1')}
          {this.renderDigit('0')}
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
