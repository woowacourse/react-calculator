import React, { useState, useEffect } from 'react';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import { expressionStorage } from '../store/store';
import { CONFIRM_MSG, OPERATOR_LIST } from '../constants/constant';
import AllClearButton from './AllCearButton';
import Screen from './Screen';

const Calculator = () => {
  const [sum, setSum] = useState('');
  const [prevNumbers, setPrevNumbers] = useState([]);
  const [operator, setOperator] = useState('');
  const [nextNumbers, setNextNumbers] = useState([]);

  useEffect(() => {
    window.addEventListener('beforeunload', confirmExist);

    const expression = expressionStorage.getExpression();
    if (!expression) return;

    const { sum, prevNumbers, operator, nextNumbers } = expression;
    setSum(sum);
    setPrevNumbers(prevNumbers);
    setOperator(operator);
    setNextNumbers(nextNumbers);

    return () => {
      window.removeEventListener('beforeunload', confirmExist);
    };
  }, []);

  const confirmExist = event => {
    event.preventDefault();
    event.returnValue = CONFIRM_MSG;

    expressionStorage.setExpression({ sum, prevNumbers, operator, nextNumbers });
  };

  return (
    <div id="app">
      <div className="calculator">
        <Screen state={{ sum, prevNumbers, operator, nextNumbers }} />
        <div className="digits flex">
          {Array.from({ length: 10 }).map((_, index) => (
            <NumberButton
              key={index}
              number={-(index - 9)}
              state={{ prevNumbers, operator, nextNumbers }}
              set={{ setPrevNumbers, setNextNumbers }}
            />
          ))}
        </div>
        <div className="modifiers subgrid">
          <AllClearButton set={{ setSum, setNextNumbers, setOperator, setPrevNumbers }} />
        </div>
        <div className="operations subgrid">
          {OPERATOR_LIST.map((operand, index) => (
            <OperatorButton
              key={index}
              operand={operand}
              state={{ prevNumbers, operator, nextNumbers }}
              set={{ setSum, setOperator }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
