import { useEffect } from 'react';
import { STORAGE_NAME } from './Constants';

import Button from './Components/Button';
import DigitButton from './Components/Digits';
import OperationButton from './Components/Operations';
import useCalculation from './Hooks/useCalculation';
import TotalText from './Components/TotalText';

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
      <TotalText>{totalNumber}</TotalText>
      <DigitButton onClickDigit={handleAddDigit} />
      <div className="modifiers subgrid">
        <Button type="button" className="modifier" onClick={handleAllClear}>
          AC
        </Button>
      </div>
      <OperationButton
        currentOperator={inputOperator}
        onClickOperation={handleSetOperator}
        onClickResult={handleCalculationResult}
      />
    </div>
  );
}

export default Calculator;
