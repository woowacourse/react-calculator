import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstOperand: '0',
      secondOperand: '',
      operator: null,
    };
  }

  digitButtons = Array.from({ length: 10 }).map((val, index) => {
    const buttonNumber = 9 - index;
    return (
      <button key={buttonNumber} className="digit">
        {buttonNumber}
      </button>
    );
  });

  #handleDigitClick = (e) => {
    if (e.target.className !== 'digit') return;
    const number = e.target.textContent;

    if (this.state.operator) {
      this.setState({
        secondOperand: this.#concatOperand(this.state.secondOperand, number),
      });

      return;
    }
    this.setState({
      firstOperand: this.#concatOperand(this.state.firstOperand, number),
    });
  };

  #concatOperand(currentOperand, number) {
    if (currentOperand && currentOperand.length > 2) return currentOperand;
    if (currentOperand === '0') return number;
    return currentOperand + number;
  }

  #handleOperatorClick = (e) => {
    if (!e.target.classList.contains('operation')) return;
    if (this.state.secondOperand) return;

    const operator = e.target.textContent;

    if (operator !== '=') {
      this.setState({
        operator: e.target.textContent,
      });

      return;
    }
  };

  #handleResultButton = (e) => {
    if (!this.state.secondOperand) return;

    this.#showResult();
  };

  #showResult() {
    const result = this.#calculate();

    this.setState({
      firstOperand: result,
      secondOperand: '',
      operator: null,
    });
  }

  #calculate() {
    if (
      !this.state.operator ||
      !this.state.firstOperand ||
      !this.state.secondOperand
    ) {
      return;
    }

    const calc = this.calculation[this.state.operator];
    return calc(
      Number(this.state.firstOperand),
      Number(this.state.secondOperand)
    );
  }

  calculation = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    X: (a, b) => a * b,
    '/': (a, b) => Math.floor(a / b),
  };

  #handleAllClear = () => {
    this.setState({
      firstOperand: '0',
      secondOperand: '',
      operator: null,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">
            {this.state.firstOperand}
            {this.state.operator}
            {this.state.secondOperand}
          </h1>
          <div className="digits flex" onClick={this.#handleDigitClick}>
            {this.digitButtons}
          </div>
          <div className="modifiers subgrid">
            <button className="modifier" onClick={this.#handleAllClear}>
              AC
            </button>
          </div>
          <div
            className="operations subgrid"
            onClick={this.#handleOperatorClick}
          >
            <button className="operation">/</button>
            <button className="operation">X</button>
            <button className="operation">-</button>
            <button className="operation">+</button>
            <button
              className="operation result-button"
              onClick={this.#handleResultButton}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
