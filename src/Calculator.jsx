import React, { useEffect, useState } from 'react';
import InputField from './components/InputField';
import ResultField from './components/ResultField';
import { OPERAND_ERROR_VALUE, STORAGE_EXPRESSION_KEY } from './constants';
import { operation, isOverOperandMaxLength } from './util';

function Calculator() {
  const [expression, setExpression] = useState(
    localStorage.getItem(STORAGE_EXPRESSION_KEY)
      ? JSON.parse(localStorage.getItem(STORAGE_EXPRESSION_KEY))
      : {
          firstOperand: '',
          secondOperand: '',
          operator: '',
        },
  );

  const saveResult = (e) => {
    e.preventDefault();
    e.returnValue = '';
    localStorage.setItem(STORAGE_EXPRESSION_KEY, JSON.stringify(expression));
  };

  const updateOperandWithNewDigit = (newDigit) => {
    const { firstOperand, secondOperand, operator } = expression;
    if (operator === '') {
      if (isOverOperandMaxLength(firstOperand)) {
        return;
      }

      setExpression({
        ...expression,
        firstOperand: firstOperand === OPERAND_ERROR_VALUE ? newDigit : firstOperand + newDigit,
      });
      return;
    }

    if (isOverOperandMaxLength(secondOperand)) {
      return;
    }
    setExpression({
      ...expression,
      secondOperand: secondOperand + newDigit,
    });
  };

  const updateOperation = (newOperation) => {
    if (newOperation !== '=' && !operation[newOperation]) return;
    if (expression.firstOperand === OPERAND_ERROR_VALUE) return;

    if (newOperation === '=') {
      calculate();
      return;
    }

    if (expression.operator !== '') return;
    setExpression({
      ...expression,
      operator: newOperation,
    });
  };

  const calculate = () => {
    const { firstOperand, secondOperand, operator } = expression;

    const newFirstOperand = operation[operator](+firstOperand, +secondOperand);

    setExpression({
      firstOperand: Number.isFinite(newFirstOperand)
        ? String(newFirstOperand)
        : OPERAND_ERROR_VALUE,
      secondOperand: '',
      operator: '',
    });
  };

  const resetExpression = () => {
    setExpression({
      firstOperand: '',
      secondOperand: '',
      operator: '',
    });
  };

  useEffect(() => {
    window.addEventListener('beforeunload', saveResult);
    return () => {
      window.removeEventListener('beforeunload', saveResult);
    };
  });

  return (
    <div className="App">
      <div className="calculator">
        <ResultField expression={expression} />
        <InputField
          updateOperandWithNewDigit={updateOperandWithNewDigit}
          updateOperation={updateOperation}
          resetExpression={resetExpression}
        />
      </div>
    </div>
  );
}

export default Calculator;
