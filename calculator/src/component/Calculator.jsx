import { Component } from 'react';
import './Calculator.css';
import { calculator } from '../domain/calculator';
export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      prevNumber: 0,
      nextNumber: null,
      operator: '',
    };
  }

  changeNumber = (e) => {
    if (!Number.isFinite(this.state.prevNumber)) {
      this.initialize();
    }
    this.setState({
      nextNumber: this.state.nextNumber * 10 + Number(e.target.textContent),
    });
  };

  calculate = (e) => {
    if (!Number.isFinite(this.state.prevNumber)) return;
    if (this.state.nextNumber === null || this.state.operator === '=') {
      this.setState({ operator: e.target.textContent });
      return;
    }

    if (this.state.operator === '') {
      this.setState({
        prevNumber: this.state.nextNumber,
        nextNumber: null,
        operator: e.target.textContent,
      });
      return;
    }

    this.setState({
      prevNumber: calculator[this.state.operator](
        this.state.prevNumber,
        this.state.nextNumber
      ),
      nextNumber: null,
      operator: e.target.textContent,
    });
  };

  initialize = () => {
    this.setState({
      prevNumber: 0,
      nextNumber: null,
      operator: '',
    });
  };

  render() {
    return (
      <div className="calculator">
        <h1 id="total">
          {Number.isFinite(this.state.prevNumber)
            ? this.state.nextNumber === null
              ? this.state.prevNumber
              : this.state.nextNumber
            : '오류'}
        </h1>
        <div className="digits flex">
          {new Array(10).fill().map((_, idx) => (
            <button className="digit" key={9 - idx} onClick={this.changeNumber}>
              {9 - idx}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={this.initialize}>
            AC
          </button>
        </div>
        <div className="operations subgrid">
          <button className="operation" onClick={this.calculate}>
            /
          </button>
          <button className="operation" onClick={this.calculate}>
            X
          </button>
          <button className="operation" onClick={this.calculate}>
            -
          </button>
          <button className="operation" onClick={this.calculate}>
            +
          </button>
          <button className="operation" onClick={this.calculate}>
            =
          </button>
        </div>
      </div>
    );
  }
}
