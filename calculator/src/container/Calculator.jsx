import { CALCULATOR, ERROR_MESSAGE } from '../constant';
import CalculatorButton from '../component/CalculatorButton';
import useCalculate from '../hooks/useCalculate';
import './Calculator.css';

export default function Calculator() {
  const { operations, result, changeNumber, initialize, calculate } = useCalculate();

  return (
    <div className="calculator">
      <h1 id="total">
        {Number.isFinite(operations.prevNumber) ? result : ERROR_MESSAGE.INFINITY_ERROR}
      </h1>

      <div className="digits flex">
        {CALCULATOR.NUMBERS.map((number) => (
          <CalculatorButton
            type="button"
            key={number}
            className="digit"
            handleClick={changeNumber}
            content={number}
          />
        ))}
      </div>

      <div className="modifiers subgrid">
        <CalculatorButton
          type="reset"
          className="modifier"
          handleClick={initialize}
          content="AC"
        />
      </div>

      <div className="operations subgrid">
        {CALCULATOR.OPERATOR.map((operator, idx) => (
          <CalculatorButton
            type="submit"
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
