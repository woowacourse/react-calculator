import { Component } from 'react';
import './Calculator.css';
import { calculator } from '../domain/calculator';
export default class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      prevNumber: Number(localStorage.getItem('result')) ?? 0,
      nextNumber: null,
      operator: '',
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.confirmExit);
    window.addEventListener('unload', this.saveResult);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.confirmExit);
    window.removeEventListener('unload', this.saveResult);
  }

  confirmExit = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  saveResult = () => {
    const result =
      this.state.nextNumber === null ? this.state.prevNumber : this.state.nextNumber;
    localStorage.setItem('result', result);
  };

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
    const result =
      this.state.nextNumber === null ? this.state.prevNumber : this.state.nextNumber;
    return (
      <div className="calculator">
        <h1 id="total">{Number.isFinite(this.state.prevNumber) ? result : '오류'}</h1>
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
          {['/', 'X', '-', '+', '='].map((operator, idx) => (
            <button key={idx} className="operation" onClick={this.calculate}>
              {operator}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
