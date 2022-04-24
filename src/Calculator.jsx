import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import ResultField from './ResultField';
import { OPERAND_ERROR_VALUE, OPERAND_MAX_LENGTH, STORAGE_KEY } from './constants';
import { operation } from './util';

function Calculator() {
  const initialValue = localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : {
        firstOperand: '',
        secondOperand: '',
        operator: '',
      };

  const [expression, setExpression] = useState(initialValue);

  useEffect(() => {
    window.addEventListener('beforeunload', saveResult);
    return () => {
      window.removeEventListener('beforeunload', saveResult);
    };
  }, []);

  const saveResult = (e) => {
    e.preventDefault();
    e.returnValue = '';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expression));
  };

  const handleNumber = (e) => {
    if (expression.operator === '') {
      if (isOverOperandMaxLength(expression.firstOperand)) {
        return;
      }
      setExpression({
        ...expression,
        firstOperand:
          expression.firstOperand === OPERAND_ERROR_VALUE
            ? e.target.value
            : expression.firstOperand + e.target.value,
      });
      return;
    }

    if (isOverOperandMaxLength(expression.secondOperand)) {
      return;
    }
    setExpression({
      ...expression,
      secondOperand: expression.secondOperand + e.target.value,
    });
  };

  const handleOperation = (e) => {
    if (expression.firstOperand === OPERAND_ERROR_VALUE) return;

    if (e.target.value === '=') {
      calculate();
      return;
    }

    if (expression.operator !== '') return;
    setExpression({
      ...expression,
      operator: e.target.value,
    });
  };

  function isOverOperandMaxLength(number) {
    return number.length >= OPERAND_MAX_LENGTH;
  }

  function calculate() {
    if (!operation[expression.operator]) return;

    const result = operation[expression.operator](
      +expression.firstOperand,
      +expression.secondOperand,
    );

    setExpression({
      firstOperand: Number.isFinite(result) ? String(result) : OPERAND_ERROR_VALUE,
      secondOperand: '',
      operator: '',
    });
  }

  function clearResult() {
    setExpression({
      firstOperand: '',
      secondOperand: '',
      operator: '',
    });
  }

  return (
    <div className="App">
      <div className="calculator">
        <ResultField expression={expression} />
        <InputField
          handleNumber={handleNumber}
          handleOperation={handleOperation}
          clearResult={clearResult}
        />
      </div>
    </div>
  );
}

export default Calculator;
