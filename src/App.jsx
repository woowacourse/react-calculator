import React, { useState, useEffect } from 'react';
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

export default function App({ store }) {
  const [numberStrings, setNumberStrings] = useState(
    DEFAULT_STATE.numberStrings
  );
  const [operator, setOperator] = useState(DEFAULT_STATE.operator);
  const [displayedText, setDisplayedText] = useState(
    DEFAULT_STATE.displayedText
  );

  const handleDigitClick = (digit) => {
    if (numberStrings[numberStrings.length - 1].length >= DIGITS.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGES.DIGIT_MAX_LENGTH_EXCEEDED);
    }

    const updatedNumberStrings = appendCharToLastElem(
      numberStrings,
      digit.toString()
    );

    setNumberStrings(updatedNumberStrings);
    setDisplayedText(updatedNumberStrings[updatedNumberStrings.length - 1]);
  };

  const handleEqualClick = () => {
    const [firstNumber, secondNumber] = numberStrings;
    const result = calculate(
      Number(firstNumber),
      Number(secondNumber),
      operator
    );

    setNumberStrings(DEFAULT_STATE.numberStrings);
    setOperator(DEFAULT_STATE.operator);
    setDisplayedText(result === Infinity ? ERROR_RESULT : result.toString());
  };

  const handleOperatorClick = (operatorInput) => {
    if (operatorInput === '=') {
      tryCatcher(handleEqualClick)();

      return;
    }

    if (
      numberStrings.length >= NUMBERS.MAX_COUNT &&
      numberStrings[numberStrings.length - 1] !== ''
    ) {
      throw new Error(ERROR_MESSAGES.NO_SECOND_NUMBER_SUBMITTED);
    }

    const prevNumberStrings = [...numberStrings];

    if (prevNumberStrings[prevNumberStrings.length - 1] !== '') {
      prevNumberStrings.push('');
    }

    setNumberStrings(prevNumberStrings);
    setOperator(operatorInput);
  };

  const handleACClick = () => {
    setNumberStrings(DEFAULT_STATE.numberStrings);
    setOperator(DEFAULT_STATE.operator);
    setDisplayedText(DEFAULT_STATE.displayedText);
  };

  const saveStates = () => {
    store.save({ numberStrings, operator, displayedText });
  };

  const loadStates = () => {
    const {
      numberStrings: storedNumberStrings,
      operator: storedOperator,
      displayedText: storedDisplayedText,
    } = store.load();

    setNumberStrings(storedNumberStrings);
    setOperator(storedOperator);
    setDisplayedText(storedDisplayedText);
  };

  const confirmLeave = (e) => {
    e.preventDefault();

    e.returnValue = '';

    return '';
  };

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', confirmLeave);

    return () => {
      window.removeEventListener('beforeunload', confirmLeave);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('unload', saveStates);

    return () => {
      window.removeEventListener('beforeunload', saveStates);
    };
  }, [saveStates]);

  return (
    <div className="App">
      <div className="calculator">
        <h1 id="total">{displayedText}</h1>
        <Keypad
          className="digits flex"
          keyClassName="digit keypad"
          keypad={DIGITS.ORDERED_LIST}
          onClick={tryCatcher(handleDigitClick)}
        />
        <Keypad
          className="modifiers subgrid"
          keyClassName="modifier keypad"
          keypad={MODIFIERS.ORDERED_LIST}
          onClick={tryCatcher(handleACClick)}
        />
        <Keypad
          className="operators subgrid"
          keyClassName="operator keypad"
          keypad={OPERATORS.ORDERED_LIST}
          onClick={tryCatcher(handleOperatorClick)}
        />
      </div>
    </div>
  );
}

App.propTypes = {
  store: PropTypes.shape({
    key: PropTypes.string,
    save: PropTypes.func,
    load: PropTypes.func,
  }),
};
