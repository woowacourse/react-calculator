import React, { useEffect, useState } from 'react';

import ResultField from './components/ResultField';
import DigitButtons from './components/DigitButtons';
import ACButtons from './components/ACButtons';
import OperatorButtons from './components/OperatorButtons';

import { ERROR_MESSAGE } from './constants';
import { operation, isOverOperandMaxLength } from './util';
import Storage from './util/Storage';

function Calculator() {
  const [expression, setExpression] = useState(Storage.expression);
  const [result, setResult] = useState(Storage.result);

  const saveResult = (e) => {
    e.preventDefault();
    e.returnValue = '';
    Storage.saveExpression(expression);
    Storage.saveResult(result);
  };

  const updateOperation = (newOperation) => {
    const { firstOperand, secondOperand, operator } = expression;

    if (result === ERROR_MESSAGE) return;
    if (newOperation === '=' && (!firstOperand || !secondOperand || !operator)) return;
    if (newOperation !== '=' && !operation[newOperation]) return;

    if (result) {
      resetResult();
    }

    if (newOperation === '=') {
      calculate();
      return;
    }

    setExpression({
      ...expression,
      operator: newOperation,
    });
  };

  const updateOperandWithNewDigit = (newDigit) => {
    if (result === ERROR_MESSAGE) return;

    if (result) {
      resetResult();
    }

    if (expression.operator === '') {
      updateFirstOperand(newDigit);
      return;
    }
    updateSecondOperand(newDigit);
  };

  const updateOperand = (name) => (newDigit) => {
    if (isOverOperandMaxLength(expression[name])) {
      return;
    }

    setExpression({
      ...expression,
      [name]: Number(expression[name] + newDigit).toString(),
    });
    return;
  };

  const updateFirstOperand = updateOperand('firstOperand');
  const updateSecondOperand = updateOperand('secondOperand');

  const calculate = () => {
    const { firstOperand, secondOperand, operator } = expression;

    const calculationResult = operation[operator](+firstOperand, +secondOperand);
    const newResult = Number.isFinite(calculationResult) ? calculationResult : ERROR_MESSAGE;

    setResult(newResult);
    setExpression({
      firstOperand: calculationResult,
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

  const resetResult = () => {
    setResult('');
  };

  const allClear = () => {
    resetExpression();
    resetResult();
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
        <ResultField>
          {result
            ? result
            : expression.firstOperand + expression.operator + expression.secondOperand}
        </ResultField>
        <DigitButtons updateOperandWithNewDigit={updateOperandWithNewDigit} />
        <ACButtons resetExpression={allClear} />
        <OperatorButtons updateOperation={updateOperation} />
      </div>
    </div>
  );
}

export default Calculator;
