import { Component } from 'react';
import './css/index.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      total: 0,
      current: 0,
      operator: '',
    };
    this.isLastClickOperator = false;
  }

  handleDigitClick(buttonValue) {
    if (this.isLastClickOperator === true) {
      this.setState({
        current: buttonValue,
      });
    }

    if (this.isLastClickOperator === false) {
      this.setState({
        current: this.state.current * 10 + buttonValue,
      });
    }

    this.isLastClickOperator = false;
  }

  handleOperatorClick(operator) {
    if (this.isLastClickOperator === true) {
      this.setState({
        operator: operator,
      });
    }

    if (this.isLastClickOperator === false) {
      if (this.state.operator === '') {
        this.setState({
          total: this.state.current,
          operator: operator,
        });
      }

      if (this.state.operator !== '') {
        const result = this.operate(
          this.state.total,
          this.state.current,
          this.state.operator
        );

        this.setState({
          total: result,
          current: result,
          operator: operator,
        });
      }
    }

    this.isLastClickOperator = true;
  }

  operate(a, b, operator) {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case 'X':
        return a * b;
      case '/':
        return a / b;
      default:
        break;
    }
  }

  handleClear() {
    this.setState({
      total: 0,
      current: 0,
      operator: '',
    });
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">
            {this.state.current === Infinity ? '오류' : this.state.current}
          </h1>
          <div className="digits flex">
            {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(num => {
              return (
                <button
                  key={num.toString()}
                  className="digit"
                  onClick={e =>
                    this.handleDigitClick(Number(e.target.textContent))
                  }
                >
                  {num}
                </button>
              );
            })}
          </div>
          <div className="modifiers subgrid">
            <button className="modifier" onClick={() => this.handleClear()}>
              AC
            </button>
          </div>
          <div className="operations subgrid">
            {['/', 'X', '-', '+', '='].map(operator => {
              return (
                <button
                  className="operation"
                  key={operator}
                  onClick={e => this.handleOperatorClick(e.target.textContent)}
                >
                  {operator}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
