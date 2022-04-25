import React, { useState, useEffect, useRef, useCallback } from 'react';
import AllClearButton from './AllClearButton';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import Screen from './Screen';
import {
  CONFIRM_MSG,
  OPERATOR_LIST,
  CALCULATOR_INITIAL_STATE,
} from '../constants/constant';
import { expressionStorage } from '../store/store';

const Calculator = () => {
  const [state, setState] = useState(CALCULATOR_INITIAL_STATE);
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
