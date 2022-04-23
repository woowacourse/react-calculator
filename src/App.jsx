import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Keypad from './components/Keypad';
import {
  DIGITS,
  NUMBERS,
  OPERATORS,
  MODIFIERS,
  DEFAULT_STATE,
  ERROR_RESULT,
  ERROR_MESSAGES,
} from './constants/constants';
import {
  tryCatcher,
  isNumberInvalid,
  calculate,
  appendDigitToLastElem,
} from './utils/commonUtils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
    this.handleACClick = this.handleACClick.bind(this);
    this.confirmLeave = this.confirmLeave.bind(this);
    this.saveStates = this.saveStates.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.confirmLeave);
    window.addEventListener('unload', this.saveStates);

    this.loadStates();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.confirmLeave);
  }

  handleDigitClick(digit) {
    const { numbers } = this.state;
    const currentNumber = numbers[numbers.length - 1];

    if (currentNumber && currentNumber.toString().length >= DIGITS.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGES.DIGIT_MAX_LENGTH_EXCEEDED);
    }

    const updatedNumbers = appendDigitToLastElem(numbers, digit);

    this.setState({ numbers: updatedNumbers });
  }

  handleOperatorClick(operator) {
    if (operator === '=') {
      tryCatcher(this.handleEqualClick)();

      return;
    }

    const { numbers } = this.state;

    if (
      numbers.length >= NUMBERS.MAX_COUNT &&
      numbers[numbers.length - 1] !== null
    ) {
      this.setState((prevState) => ({
        numbers: [
          calculate(
            prevState.numbers[0],
            prevState.numbers[1],
            prevState.operator
          ),
          null,
        ],
        operator,
      }));

      return;
    }

    this.setState((prevState) => {
      const prevNumbers = prevState.numbers;

      if (prevNumbers[prevNumbers.length - 1] !== null) {
        prevNumbers.push(null);
      }

      return {
        numbers: prevNumbers,
        operator,
      };
    });
  }

  handleEqualClick() {
    const {
      numbers: [firstNumber, secondNumber],
      operator,
    } = this.state;
    const result = calculate(firstNumber, secondNumber, operator);

    this.setState({
      numbers: [result],
      operator: DEFAULT_STATE.operator,
    });
  }

  handleACClick() {
    this.setState(DEFAULT_STATE);
  }

  saveStates() {
    const { store } = this.props;

    store.save(this.state);
  }

  loadStates() {
    const { store } = this.props;
    const state = store.load();

    this.setState(state);
  }

  confirmLeave(e) {
    e.preventDefault();

    e.returnValue = '';

    return '';
  }

  render() {
    const result = this.state.numbers.filter((number) => number !== null).pop();
    const displayedText = isNumberInvalid(result)
      ? ERROR_RESULT
      : result.toString();

    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">{displayedText}</h1>
          <Keypad
            className="digits flex"
            keyClassName="digit keypad"
            keypad={DIGITS.ORDERED_LIST}
            onClick={tryCatcher(this.handleDigitClick)}
          />
          <Keypad
            className="modifiers subgrid"
            keyClassName="modifier keypad"
            keypad={MODIFIERS.ORDERED_LIST}
            onClick={this.handleACClick}
          />
          <Keypad
            className="operators subgrid"
            keyClassName="operator keypad"
            keypad={OPERATORS.ORDERED_LIST}
            onClick={tryCatcher(this.handleOperatorClick)}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({
    key: PropTypes.string,
    save: PropTypes.func,
    load: PropTypes.func,
  }),
};
