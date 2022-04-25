import React, { useEffect } from 'react';
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
import { useStateRef } from './utils/hooks';

const App = ({ store }) => {
  const [numbers, setNumbers, numbersRef] = useStateRef([0]);
  const [operator, setOperator, operatorRef] = useStateRef(null);

  const saveStates = () => {
    store.save({
      numbers: numbersRef.current,
      operator: operatorRef.current,
    });
  };

  const loadStates = () => {
    const prevState = store.load();

    setNumbers(prevState.numbers);
    setOperator(prevState.operator);
  };

  const confirmLeave = (e) => {
    e.preventDefault();

    e.returnValue = '';

    return '';
  };

  useEffect(() => {
    window.addEventListener('unload', saveStates);
    window.addEventListener('beforeunload', confirmLeave);

    loadStates();
  }, []);

  const handleDigitClick = (digit) => {
    const currentNumber = numbers[numbers.length - 1];

    if (currentNumber && currentNumber.toString().length >= DIGITS.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGES.DIGIT_MAX_LENGTH_EXCEEDED);
    }

    const updatedNumbers = appendDigitToLastElem(numbers, digit);

    setNumbers(updatedNumbers);
  };

  const handleEqualClick = () => {
    const result = calculate(numbers[0], numbers[1], operator);

    setNumbers([result]);
    setOperator(DEFAULT_STATE.operator);
  };

  const handleOperatorClick = (clickedOperator) => {
    if (clickedOperator === '=') {
      tryCatcher(handleEqualClick)();

      return;
    }

    if (
      numbers.length >= NUMBERS.MAX_COUNT &&
      numbers[numbers.length - 1] !== null
    ) {
      setNumbers((prevNumbers) => [
        calculate(prevNumbers[0], prevNumbers[1], operator),
        null,
      ]);
      setOperator(clickedOperator);

      return;
    }

    setNumbers((prevNumbers) => {
      if (prevNumbers[prevNumbers.length - 1] !== null) {
        prevNumbers.push(null);
      }

      return prevNumbers;
    });
    setOperator(clickedOperator);
  };

  const handleACClick = () => {
    setNumbers(DEFAULT_STATE.numbers);
    setOperator(DEFAULT_STATE.operator);
  };

  const result = numbers.filter((number) => number !== null).pop();
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
          onClick={tryCatcher(handleDigitClick)}
        />
        <Keypad
          className="modifiers subgrid"
          keyClassName="modifier keypad"
          keypad={MODIFIERS.ORDERED_LIST}
          onClick={handleACClick}
        />
        <Keypad
          className="operators subgrid"
          keyClassName="operator keypad"
          keypad={OPERATORS.ORDERED_LIST}
          onClick={tryCatcher(handleOperatorClick)}
          highlightIf={(value) => value === operator}
        />
      </div>
    </div>
  );
};

App.propTypes = {
  store: PropTypes.shape({
    key: PropTypes.string,
    save: PropTypes.func,
    load: PropTypes.func,
  }),
};

export default App;
