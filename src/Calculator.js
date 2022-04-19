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

  render() {
    const { operator, numbers } = this.state;

    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">0</h1>
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

            <button className="operation">=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
