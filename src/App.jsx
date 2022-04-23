import { useState, useEffect } from 'react';
import Digit from './components/Digit';
import Operator from './components/Operator';
import './App.scss';

import { ERROR_MESSAGE, RULE } from './constants';

const savedTotal = localStorage.getItem('total');

export default function App() {
  const [num1, setNum1] = useState(savedTotal ?? '');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [total, setTotal] = useState(savedTotal ?? 0);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
  }, [total]);

  const handleBeforeUnload = e => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handleUnload = () => {
    localStorage.setItem('total', total);
  };

  const setNumberState = number => {
    if (!operator) {
      if (num1.length >= RULE.MAX_DIGIT_LENGTH)
        return alert(ERROR_MESSAGE.IS_OVER_MAX_DIGIT_LENGTH);

      setNum1(prevState => (prevState === '0' ? number : prevState + number));
      return;
    }

    if (num2.length >= RULE.MAX_DIGIT_LENGTH)
      return alert(ERROR_MESSAGE.IS_OVER_MAX_DIGIT_LENGTH);

    setNum2(prevState => (prevState === '0' ? number : prevState + number));
  };

  const setOperatorState = operatorInput => {
    if (num1 === '0' || !num1 || num2) return;
    setOperator(operatorInput);
  };

  const calculate = () => {
    switch (operator) {
      case '+':
        setTotal(Number(num1) + Number(num2));
        break;
      case '-':
        setTotal(Number(num1) - Number(num2));
        break;
      case 'X':
        setTotal(Number(num1) * Number(num2));
        break;
      case '/': {
        const result = parseInt(Number(num1) / Number(num2), 10);
        setTotal(Number.isNaN(result) ? ERROR_MESSAGE.INFINITY_TOTAL : result);
      }
    }
    setNum1('');
    setNum2('');
    setOperator('');
  };

  const allClear = () => {
    setNum1('');
    setNum2('');
    setOperator('');
    setTotal(0);
  };

  return (
    <div className="calculator">
      <h1 id="total">{num1 ? num1 + operator + num2 : total}</h1>
      <Digit setNumberState={setNumberState} />
      <Operator
        setOperatorState={setOperatorState}
        calculate={calculate}
        allClear={allClear}
      />
    </div>
  );
}
