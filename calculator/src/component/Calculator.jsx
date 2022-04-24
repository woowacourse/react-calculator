import { calculator } from '../domain/calculator';
import { CALCULATOR, ERROR_MESSAGE } from '../constant';
import { storage } from '../domain/storage';
import './Calculator.css';
import { useEffect, useState } from 'react';
import CalculatorButton from './CalculatorButton';

export default function Calculator() {
  const [operations, setOperations] = useState(storage.getStoredOperations());
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (operations.nextNumber === null) {
      setResult(operations.prevNumber);
    } else {
      setResult(operations.nextNumber);
    }

    window.addEventListener('beforeunload', confirmExit);
    window.addEventListener('unload', saveResult);

    return () => {
      window.removeEventListener('beforeunload', confirmExit);
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
    storage.saveOperations(operations);
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
            class="digit"
            onClick={changeNumber}
            content={number}
          />
        ))}
      </div>

      <div className="modifiers subgrid">
        <CalculatorButton class="modifier" onClick={initialize} content="AC" />
      </div>

      <div className="operations subgrid">
        {[...CALCULATOR.OPERATOR].map((operator, idx) => (
          <CalculatorButton
            key={idx}
            class="operation"
            onClick={calculate}
            content={operator}
          />
        ))}
      </div>
    </div>
  );
}
