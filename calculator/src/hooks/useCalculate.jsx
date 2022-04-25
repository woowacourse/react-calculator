import { useEffect, useState } from 'react';
import { CALCULATOR } from '../constant';
import { calculator } from '../domain/calculator';
import { getStoredOperations, saveOperations } from '../domain/storage';
import { upToThreeDecimalPoint } from '../utils';

export default function useCalculate() {
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
      setResult(upToThreeDecimalPoint(operations.prevNumber));
    } else {
      setResult(upToThreeDecimalPoint(operations.nextNumber));
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

  const changeNumber = (number) => {
    if (!Number.isFinite(operations.prevNumber)) {
      initialize();
    }
    if (operations.operator === '=') {
      setOperations({
        ...operations,
        prevNumber: operations.nextNumber * CALCULATOR.UNIT + Number(number),
      });
      return;
    }

    setOperations({
      ...operations,
      nextNumber: operations.nextNumber * CALCULATOR.UNIT + Number(number),
    });
  };

  const calculate = (operator) => {
    if (!Number.isFinite(operations.prevNumber)) return;

    if (operations.nextNumber === null || operations.operator === '=') {
      setOperations({
        ...operations,
        operator,
      });
      return;
    }

    if (operations.operator === '') {
      setOperations({
        ...operations,
        prevNumber: operations.nextNumber,
        nextNumber: null,
        operator,
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
      operator,
    });
  };

  return {
    operations,
    result,
    initialize,
    changeNumber,
    calculate,
  };
}
