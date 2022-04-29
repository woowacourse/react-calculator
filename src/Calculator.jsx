import React, { useEffect, useState } from 'react';

import ResultField from './components/ResultField';
import DigitButtons from './components/DigitButtons';
import ACButtons from './components/ACButtons';
import OperatorButtons from './components/OperatorButtons';

import { OPERAND_ERROR_VALUE } from './constants';
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
        <ResultField>
          {expression.firstOperand + expression.operator + expression.secondOperand}
        </ResultField>
        <DigitButtons updateOperandWithNewDigit={updateOperandWithNewDigit} />
        <ACButtons resetExpression={resetExpression} />
        <OperatorButtons updateOperation={updateOperation} />
      </div>
    </div>
  );
}

export default Calculator;
