import React, { useState, useEffect, useRef, useCallback } from 'react';
import AllClearButton from './AllClearButton';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import Screen from './Screen';
import {
  CONFIRM_MSG,
  OPERATOR_LIST,
  CALCULATOR_INITIAL_STATE,
  OPERATOR,
  ERROR_MSG,
} from '../constants/constant';
import { expressionStorage } from '../store/store';

const Calculator = () => {
  const [state, setState] = useState(CALCULATOR_INITIAL_STATE);
  const { prevNumbers, operator, nextNumbers } = state;
  const stateRef = useRef(state);

  stateRef.current = state;

  const confirmExist = useCallback(event => {
    event.preventDefault();
    event.returnValue = CONFIRM_MSG;

    expressionStorage.setExpression(stateRef.current);
  }, []);

  const setInitialState = () => {
    const expression = expressionStorage.getExpression();
    if (!expression) return;

    const { sum, prevNumbers, operator, nextNumbers } = expression;
    setState({ sum, prevNumbers, operator, nextNumbers });
  };

  useEffect(() => {
    setInitialState();
    window.addEventListener('beforeunload', confirmExist);
    return () => {
      window.removeEventListener('beforeunload', confirmExist);
    };
  }, []);

  const onClickEqual = () => {
    setState({
      ...CALCULATOR_INITIAL_STATE,
      sum: calculateSum(),
    });
  };

  const calculateSum = () => {
    const prevNumber = Number(prevNumbers.join(''));
    const nextNumber = Number(nextNumbers.join(''));

    switch (operator) {
      case OPERATOR.PLUS:
        return prevNumber + nextNumber;
      case OPERATOR.SUBSTRACT:
        return prevNumber - nextNumber;
      case OPERATOR.MULTI:
        return prevNumber * nextNumber;
      case OPERATOR.DIVIDE:
        if (!isFinite(prevNumber / nextNumber)) {
          return ERROR_MSG.INFINITY;
        }
        return Math.floor(prevNumber / nextNumber);
      default:
        return prevNumber;
    }
  };

  return (
    <div id="app">
      <div className="calculator">
        <Screen state={state} />
        <div className="digits flex">
          {Array.from({ length: 10 }).map((_, index) => (
            <NumberButton
              key={index}
              number={9 - index}
              state={state}
              setState={setState}
            />
          ))}
        </div>
        <div className="modifiers subgrid">
          <AllClearButton clear={setState} />
        </div>
        <div className="operations subgrid">
          {OPERATOR_LIST.map((operand, index) => (
            <OperatorButton
              key={index}
              selfOperand={operand}
              state={state}
              setState={setState}
              calculate={onClickEqual}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
