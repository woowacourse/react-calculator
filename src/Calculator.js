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

  onClickOperator = ({ target }) => {
    this.setState({ operator: target.textContent });
  };

  render() {
    const { operator } = this.state;
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">0</h1>
          <div className="digits flex">
            <button className="digit">9</button>
            <button className="digit">8</button>
            <button className="digit">7</button>
            <button className="digit">6</button>
            <button className="digit">5</button>
            <button className="digit">4</button>
            <button className="digit">3</button>
            <button className="digit">2</button>
            <button className="digit">1</button>
            <button className="digit">0</button>
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
