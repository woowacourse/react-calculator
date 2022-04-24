import { useCallback } from 'react';
import './Operator.scss';

export default function Operator({ setOperatorState, calculate, allClear }) {
  const handleOperatorButtonClick = useCallback(({ target }) => {
    const operator = target.textContent;

    if (operator === '=') {
      calculate();
      return;
    }
    setOperatorState(operator);
  });

  return (
    <>
      <div className="modifiers subgrid">
        <button className="modifier" onClick={allClear}>
          AC
        </button>
      </div>
      <div className="operations subgrid" onClick={handleOperatorButtonClick}>
        {['/', 'X', '-', '+', '='].map((operation, idx) => (
          <button className="operation" key={idx}>
            {operation}
          </button>
        ))}
      </div>
    </>
  );
}
