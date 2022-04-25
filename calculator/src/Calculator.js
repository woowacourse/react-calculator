import { useCallback, useEffect, useState } from 'react';

import Digits from './Digits';
import Operations from './Operations';

import { ERROR_MESSAGE, RULE } from './constants';

const prevTotal = localStorage.getItem('total');

const initialState = {
  num1: prevTotal ?? '',
  num2: '',
  operation: '',
  total: prevTotal ?? 0,
};

function Calculator() {
  const [state, setState] = useState(initialState);

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handleUnload = useCallback(() => {
    const { total } = state;

    if (!Number.isInteger(total)) return;

    if (!total) {
      localStorage.removeItem('total');

      return;
    }

    localStorage.setItem('total', total);
  }, [state]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
  }, [handleUnload]);

  const handleDigitButtonClick = ({ target }) => {
    const digit = target.textContent;
    const { num1, num2, operation, total } = state;

    if (!operation) {
      if (num1.length >= RULE.MAX_DIGIT_LENGTH)
        return alert(ERROR_MESSAGE.IS_OVER_MAX_DIGIT_LENGTH);

      setState({
        ...state,
        num1: num1 + digit,
        total: !Number(total) ? digit : total + digit,
      });

      return;
    }

    if (num2.length >= RULE.MAX_DIGIT_LENGTH)
      return alert(ERROR_MESSAGE.IS_OVER_MAX_DIGIT_LENGTH);

    setState({ ...state, num2: num2 + digit, total: total + digit });
  };

  const handleACButtonClick = () => {
    setState({ num1: '', num2: '', operation: '', total: 0 });
  };

  const calculate = () => {
    const { num1, num2, operation } = state;

    switch (operation) {
      case '+':
        return Number(num1) + Number(num2);
      case '-':
        return Number(num1) - Number(num2);
      case 'X':
        return Number(num1) * Number(num2);
      case '/':
        const result = parseInt(Number(num1) / Number(num2), 10);
        return Number.isNaN(result) ? ERROR_MESSAGE.INFINITY_TOTAL : result;
      // no default
    }
  };

  const handleOperationButtonClick = ({ target }) => {
    const operationInput = target.textContent;
    const { num1, num2, operation, total } = state;

    if (!num1 || (operationInput === '=' && !num2)) return;

    if (operation && operationInput !== '=')
      return alert(ERROR_MESSAGE.IS_OVER_MAX_OPERATION_COUNT);

    if (operationInput === '=') {
      const newTotal = calculate();

      setState({ num1: newTotal, num2: '', operation: '', total: newTotal });

      return;
    }

    setState({
      ...state,
      operation: operationInput,
      total: total + operationInput,
    });
  };

  return (
    <div className='calculator'>
      <h1 id='total'>{state.total}</h1>
      <div className='digits flex' onClick={handleDigitButtonClick}>
        <Digits />
      </div>
      <div className='modifiers subgrid'>
        <button className='modifier' onClick={handleACButtonClick}>
          AC
        </button>
      </div>
      <div className='operations subgrid' onClick={handleOperationButtonClick}>
        <Operations />
      </div>
    </div>
  );
}

export default Calculator;
