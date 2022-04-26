import {
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import '../styles/Calculator.css';
import { computeExpression, hasInput, computeNextOperand } from '../utils';
import Expression from './Expression';
import Digits from './Digits';
import Modifier from './Modifier';
import Operations from './Operations';

const Calculator = () => {
  const [state, setState] = useState({
    firstOperand: 0,
    secondOperand: -1,
    operation: null,
    isError: false,
  });

  const ref = useRef(null);

  useLayoutEffect(() => {
    const memoizedState = JSON.parse(localStorage.getItem('prevState'));
    if (!memoizedState) return;
    setState(memoizedState);
  }, []);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose);
    return () => window.removeEventListener('beforeunload', handleWindowClose);
  }, []);

  const handleWindowClose = (e) => {
    e.preventDefault();
    if (!hasInput(ref.current)) return;
    localStorage.setItem('prevState', JSON.stringify(ref.current));
    e.returnValue = '';
  };

  const onClickDigit = (digit) => () => {
    state.operation
      ? setState((prevState) => ({
          ...prevState,
          secondOperand: computeNextOperand(
            prevState.secondOperand === -1 ? 0 : prevState.secondOperand,
            digit,
          ),
        }))
      : setState((prevState) => ({
          ...prevState,
          firstOperand: computeNextOperand(prevState.firstOperand, digit),
        }));
  };

  const onClickOperation = (operation) => () => {
    if (operation !== '=') {
      setState((prevState) => ({
        ...prevState,
        operation,
      }));
      return;
    }
    const result = computeExpression({
      firstOperand: Number(state.firstOperand),
      secondOperand: Number(state.secondOperand),
      operation: state.operation,
    });

    if (isFinite(result)) {
      setState((prevState) => ({
        ...prevState,
        firstOperand: result,
        secondOperand: -1,
        operation: null,
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      isError: false,
    }));
  };

  const onClickModifier = useCallback(() => {
    setState({
      firstOperand: 0,
      secondOperand: -1,
      operation: null,
      isError: false,
    });
  }, []);

  return (
    <>
      <div>숫자는 3자리 까지만 입력이 가능합니다.</div>
      <div className="calculator">
        <Expression
          isError={state.isError}
          firstOperand={state.firstOperand}
          operation={state.operation}
          secondOperand={state.secondOperand}
        />
        <Digits onClick={onClickDigit} />
        <Modifier onClick={onClickModifier} />
        <Operations onClick={onClickOperation} />
      </div>
    </>
  );
};

export default Calculator;
