import { useEffect } from 'react';
import DigitButton from './Components/DigitButton';
import OperationButton from './Components/OperationButton';
import useCalculation from './Hooks/useCalculation';
import { STORAGE_NAME } from './Constants';

import './Calculator.css';

function Calculator() {
  const { state, handler } = useCalculation();

  const { inputNumbers, inputOperator, totalNumber } = state;
  const { handleAddDigit, handleSetOperator, handleCalculationResult, handleAllClear } = handler;

  useEffect(() => {
    const onBeforeUnload = (event) => {
      localStorage.setItem(
        STORAGE_NAME,
        JSON.stringify({
          numbers: inputNumbers,
          operator: inputOperator,
        }),
      );

      event.preventDefault();
      return '정말 페이지를 나가시겠습니까?';
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [inputNumbers, inputOperator]);

  return (
    <div className="calculator">
      <h1 id="total">{totalNumber === Infinity ? '오류' : totalNumber}</h1>
      <DigitButton onClickDigit={handleAddDigit} />
      <div className="modifiers subgrid">
        <button type="button" className="modifier" onClick={handleAllClear}>
          AC
        </button>
      </div>

      <OperationButton
        onClickOperation={handleSetOperator}
        onClickResult={handleCalculationResult}
      />
    </div>
  );
}

export default Calculator;
