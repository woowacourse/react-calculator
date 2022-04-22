import { useState } from 'react';
import {
  ERROR_MESSAGE,
  INFINITY_CASE_TEXT,
  MAX_NUMBER_LENGTH,
} from '../constants';

const calculateExpression = (prevNumber, operator, nextNumber) => {
  const num1 = Number(prevNumber);
  const num2 = Number(nextNumber);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'X':
      return num1 * num2;
    case '/':
      return num2 === 0 ? INFINITY_CASE_TEXT : Number.parseInt(num1 / num2);
    default:
      alert(ERROR_MESSAGE.STRANGE_OPERATOR(operator));
  }
};

export default function useExpression() {
  const [expression, setExpression] = useState({
    prevNumber: '',
    operator: '',
    nextNumber: '',
  });

  const handleClickAC = () => {
    setExpression({
      prevNumber: '',
      operator: '',
      nextNumber: '',
    });
  };

  const handleClickDigit = ({ target: { textContent: selectedDigit } }) => {
    if (expression.prevNumber === INFINITY_CASE_TEXT) {
      setExpression((prevState) => ({
        ...prevState,
        prevNumber: selectedDigit,
      }));
      return;
    }

    updateNumber(
      expression.operator ? 'nextNumber' : 'prevNumber',
      selectedDigit
    );
  };

  const updateNumber = (numberKey, selectedDigit) => {
    if (expression[numberKey].length >= MAX_NUMBER_LENGTH) {
      alert(ERROR_MESSAGE.EXCEED_MAX_NUMBER_LENGTH);
      return;
    }
    setExpression((prevState) => ({
      ...prevState,
      [numberKey]: prevState[numberKey] + selectedDigit,
    }));
  };

  const handleClickOperator = ({
    target: { textContent: selectedOperator },
  }) => {
    const { prevNumber, operator } = expression;

    if (prevNumber === INFINITY_CASE_TEXT) return;

    if (selectedOperator !== '=' && operator) {
      alert(ERROR_MESSAGE.ALLOW_ONE_OPERATOR);
      return;
    }

    if (selectedOperator !== '=' && !operator) {
      setExpression((prevState) => ({
        ...prevState,
        operator: selectedOperator,
      }));
      return;
    }

    if (operator) {
      setExpression((prevState) => ({
        prevNumber: calculateExpression(
          prevState.prevNumber,
          prevState.operator,
          prevState.nextNumber
        ),
        operator: '',
        nextNumber: '',
      }));
    }
  };

  return {
    expression,
    setExpression,
    handleClickAC,
    handleClickDigit,
    handleClickOperator,
  };
}
