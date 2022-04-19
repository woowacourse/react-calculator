import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numbers: [0, 0],
      operator: '',
    };
  }

  onClickDigit = ({ target }) => {
    const numberIndex = this.state.operator === '' ? 0 : 1;
    const newStateNumbers = [...this.state.numbers];
    newStateNumbers[numberIndex] = newStateNumbers[numberIndex] * 10 + Number(target.innerText);

    if (newStateNumbers[numberIndex] >= 1000) {
      alert('숫자는 세 자리까지 입력 가능합니다.');
      return;
    }

    this.setState({ numbers: newStateNumbers });
  };

  onClickOperator = ({ target }) => {
    this.setState({ operator: target.textContent });
  };

  onClickResult = () => {
    const { operator, numbers } = this.state;

    if (operator === '') {
      alert('연산자를 입력해주세요.');
      return;
    }

    const operatorCollection = {
      '+': () => numbers[0] + numbers[1],
      '-': () => numbers[0] - numbers[1],
      X: () => numbers[0] * numbers[1],
      '/': () => numbers[0] / numbers[1],
    };

    const resultNumber = Number(operatorCollection[operator]().toFixed(2));
    this.setState({ numbers: [resultNumber, 0], operator: '' });
  };

  render() {
    const { operator, numbers } = this.state;
    console.log(operator, numbers);

    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">{!operator || numbers[1] === 0 ? numbers[0] : numbers[1]}</h1>
          <div className="digits flex">
            <button className="digit" onClick={this.onClickDigit}>
              9
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              8
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              7
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              6
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              5
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              4
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              3
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              2
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              1
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              0
            </button>
          </div>
          <div className="modifiers subgrid">
            <button className="modifier">AC</button>
          </div>
          <div className="operations subgrid">
            {/* 연산자 컴포넌트로 나누기 */}
            <button
              className={'operation' + (operator === '/' && 'pressed')}
              onClick={this.onClickOperator}
            >
              /
            </button>
            <button
              className={'operation' + (operator === 'X' && 'pressed')}
              onClick={this.onClickOperator}
            >
              X
            </button>
            <button
              className={'operation' + (operator === '-' && 'pressed')}
              onClick={this.onClickOperator}
            >
              -
            </button>
            <button
              className={'operation' + (operator === '+' && 'pressed')}
              onClick={this.onClickOperator}
            >
              +
            </button>

            <button className="operation" onClick={this.onClickResult}>
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
