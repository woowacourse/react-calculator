import { calculator } from '../domain/calculator';
import { CALCULATOR, ERROR_MESSAGE } from '../constant';
import { getStoredOperations, saveOperations } from '../domain/storage';
import './Calculator.css';
import { useEffect, useState } from 'react';
import CalculatorButton from '../component/CalculatorButton';
import { limitThreeDecimal } from '../utils';

export default function Calculator() {
  const [operations, setOperations] = useState(getStoredOperations());
  const [result, setResult] = useState(0);

  useEffect(() => {
    window.addEventListener('beforeunload', confirmExit);

    return () => {
      window.removeEventListener('beforeunload', confirmExit);
    };
  }, []);

  useEffect(() => {
    if (operations.nextNumber === null) {
      setResult(limitThreeDecimal(operations.prevNumber));
    } else {
      setResult(limitThreeDecimal(operations.nextNumber));
    }

    window.addEventListener('unload', saveResult);

    return () => {
      window.removeEventListener('unload', saveResult);
    };
  }, [operations]);

  const initialize = () => {
    setOperations({
      prevNumber: 0,
      nextNumber: null,
      operator: '',
    });
  };

  const confirmExit = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const saveResult = () => {
    saveOperations(operations);
  };

  const changeNumber = (e) => {
    if (!Number.isFinite(operations.prevNumber)) {
      initialize();
    }
    if (operations.operator === '=') {
      setOperations({
        ...operations,
        prevNumber:
          operations.nextNumber * CALCULATOR.UNIT + Number(e.target.textContent),
      });
      return;
    }

    setOperations({
      ...operations,
      nextNumber: operations.nextNumber * CALCULATOR.UNIT + Number(e.target.textContent),
    });
  };

  const calculate = (e) => {
    if (!Number.isFinite(operations.prevNumber)) return;

    if (operations.nextNumber === null || operations.operator === '=') {
      setOperations({
        ...operations,
        operator: e.target.textContent,
      });
      return;
    }

    if (operations.operator === '') {
      setOperations({
        ...operations,
        prevNumber: operations.nextNumber,
        nextNumber: null,
        operator: e.target.textContent,
      });
      return;
    }

    setOperations({
      ...operations,
      prevNumber: calculator[operations.operator](
        operations.prevNumber,
        operations.nextNumber
      ),
      nextNumber: null,
      operator: e.target.textContent,
    });
  };

  return (
    <div className="calculator">
      <h1 id="total">
        {Number.isFinite(operations.prevNumber) ? result : ERROR_MESSAGE.INFINITY_ERROR}
      </h1>

      <div className="digits flex">
        {CALCULATOR.NUMBERS.map((number) => (
          <CalculatorButton
            key={number}
            className="digit"
            handleClick={changeNumber}
            content={number}
          />
        ))}
      </div>

      <div className="modifiers subgrid">
        <CalculatorButton className="modifier" handleClick={initialize} content="AC" />
      </div>

      <div className="operations subgrid">
        {CALCULATOR.OPERATOR.map((operator, idx) => (
          <CalculatorButton
            key={idx}
            className="operation"
            handleClick={calculate}
            content={operator}
          />
        ))}
      </div>
    </div>
  );
}
