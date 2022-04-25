/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import DigitButton from './DigitButton';
import ModifierButton from './ModifierButton';
import OperationButton from './OperationButton';
import Result from './Result';
import { digits, operations } from '../constants/buttonChar';

const Calculator = function () {
  const [operand, setOperand] = useState(['0', '']);
  const [operator, setOperator] = useState('');
  const [index, setIndex] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleBeforeUnload = e => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handleUnload = () => {
    localStorage.setItem('state', JSON.stringify({ operand, operator, index }));
  };

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('state')) ?? {
      operand,
      operator,
      index,
    };
    setOperand(localState.operand);
    setOperator(localState.operator);
    setIndex(localState.index);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  });

  return (
    <div className="calculator">
      <Result operand={operand} operator={operator} />
      <div className="digits flex">
        {digits.map(digit => (
          <DigitButton
            key={digit}
            digit={digit}
            operand={operand}
            setOperand={setOperand}
            index={index}
            isCalculated={isCalculated}
            setIsCalculated={setIsCalculated}
          />
        ))}
      </div>
      <div className="modifiers subgrid">
        <ModifierButton setOperand={setOperand} setOperator={setOperator} setIndex={setIndex} />
      </div>
      <div className="operations subgrid">
        {operations.map(operation => (
          <OperationButton
            key={operation}
            operand={operand}
            operation={operation}
            operator={operator}
            setOperand={setOperand}
            setOperator={setOperator}
            setIndex={setIndex}
            setIsCalculated={setIsCalculated}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
