import { Component } from 'react';
import { calculator } from '../domain/calculator';
import { CALCULATOR, ERROR_MESSAGE, LOCAL_STORAGE_KEY } from '../constant';
import { storage } from '../domain/storage';
import './Calculator.css';

export default class Calculator extends Component {
  constructor() {
    super();

    const {
      prevNumber = 0,
      nextNumber = null,
      operator = '',
    } = storage.getStoredOperations(LOCAL_STORAGE_KEY);

    this.state = {
      prevNumber: Number(prevNumber),
      nextNumber: nextNumber && Number(nextNumber),
      operator: operator,
    };
  }

  initialize = () => {
    this.setState({
      prevNumber: 0,
      nextNumber: null,
      operator: '',
    });
  };

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
    storage.storeOperations(this.state);
  };

  changeNumber = (e) => {
    if (!Number.isFinite(this.state.prevNumber)) {
      this.initialize();
    }

    this.setState({
      nextNumber: this.state.nextNumber * CALCULATOR.UNIT + Number(e.target.textContent),
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

  render() {
    const result =
      this.state.nextNumber === null ? this.state.prevNumber : this.state.nextNumber;
    return (
      <div className="calculator">
        <h1 id="total">
          {Number.isFinite(this.state.prevNumber) ? result : ERROR_MESSAGE.INFINITY_ERROR}
        </h1>
        <div className="digits flex">
          {CALCULATOR.NUMBERS.map((digit) => (
            <button className="digit" key={digit} onClick={this.changeNumber}>
              {digit}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={this.initialize}>
            AC
          </button>
        </div>
        <div className="operations subgrid">
          {[...CALCULATOR.OPERATOR].map((operator, idx) => (
            <button key={idx} className="operation" onClick={this.calculate}>
              {operator}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
