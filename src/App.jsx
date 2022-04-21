import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Keypad from './components/Keypad';
// import Button from './components/Button';
import {
  DIGITS,
  NUMBERS,
  OPERATORS,
  MODIFIERS,
  DEFAULT_STATE,
  ERROR_RESULT,
  ERROR_MESSAGES,
} from './constants/constants';
import { tryCatcher } from './utils/commonUtils';

const calculate = (firstNumber, secondNumber, operator) => {
  switch (operator) {
    case OPERATORS.ADD:
      return firstNumber + secondNumber;
    case OPERATORS.SUBTRACT:
      return firstNumber - secondNumber;
    case OPERATORS.MULTIPLY:
      return firstNumber * secondNumber;
    case OPERATORS.DIVIDE:
      return secondNumber === 0
        ? Infinity
        : parseInt(firstNumber / secondNumber, 10);
    default:
      throw new Error(ERROR_MESSAGES.INVALID_OPERATOR);
  }
};

const appendCharToLastElem = (list, char) => {
  const listClone = [...list];
  const lastIndex = listClone.length - 1;

  listClone[lastIndex] += char;

  return listClone;
};

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
    const { numberStrings } = this.state;

    if (numberStrings[numberStrings.length - 1].length >= DIGITS.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGES.DIGIT_MAX_LENGTH_EXCEEDED);
    }

    const updatedNumberStrings = appendCharToLastElem(
      numberStrings,
      digit.toString()
    );

    this.setState({
      numberStrings: updatedNumberStrings,
      displayedText: updatedNumberStrings[updatedNumberStrings.length - 1],
    });
  }

  handleOperatorClick(operator) {
    if (operator === '=') {
      tryCatcher(this.handleEqualClick)();

      return;
    }
    const { numberStrings } = this.state;

    if (
      numberStrings.length >= NUMBERS.MAX_COUNT &&
      numberStrings[numberStrings.length - 1] !== ''
    ) {
      throw new Error(ERROR_MESSAGES.NO_SECOND_NUMBER_SUBMITTED);
    }

    this.setState((prevState) => {
      const prevNumberStrings = prevState.numberStrings;

      if (prevNumberStrings[prevNumberStrings.length - 1] !== '') {
        prevNumberStrings.push('');
      }

      return {
        numberStrings: prevNumberStrings,
        operator,
      };
    });
  }

  handleEqualClick() {
    const {
      numberStrings: [firstNumber, secondNumber],
      operator,
    } = this.state;
    const result = calculate(
      Number(firstNumber),
      Number(secondNumber),
      operator
    );

    this.setState({
      numberStrings: DEFAULT_STATE.numberStrings,
      operator: DEFAULT_STATE.operator,
      displayedText: result === Infinity ? ERROR_RESULT : result.toString(),
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
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">{this.state.displayedText}</h1>
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
            onClick={tryCatcher(this.handleACClick)}
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
