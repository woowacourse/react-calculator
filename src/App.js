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

  handleDigitClick = (e) => {
    if (e.target.className !== 'digit') return;
    const number = e.target.textContent;

    if (this.state.operator) {
      this.setState({
        secondOperand: this.concatOperand(this.state.secondOperand, number),
      });
      return;
    }
    this.setState({
      firstOperand: this.concatOperand(this.state.firstOperand, number),
    });
  };

  concatOperand(currentOperand, number) {
    if (currentOperand && currentOperand.length > 2) return currentOperand;
    if (currentOperand === '0') return number;
    return currentOperand + number;
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">
            {this.state.firstOperand}
            {this.state.operator}
            {this.state.secondOperand}
          </h1>
          <div className="digits flex" onClick={this.handleDigitClick}>
            {this.digitButtons}
          </div>
          <div className="modifiers subgrid">
            <button className="modifier">AC</button>
          </div>
          <div className="operations subgrid">
            <button className="operation">/</button>
            <button className="operation">X</button>
            <button className="operation">-</button>
            <button className="operation">+</button>
            <button className="operation">=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
