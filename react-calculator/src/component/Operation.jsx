import React, { memo } from "react";

const operationArray = ["/", "x", "-", "+"];

const Operation = memo((props) => {
  const { onClickClearButton, onClickEqualOperation, onClickOperation } = props;

  return (
    <>
      <div className="modifiers subgrid">
        <button
          className="modifier"
          id="clear-button"
          onClick={onClickClearButton}
        >
          AC
        </button>
      </div>
      <div className="operations subgrid">
        {operationArray.map((operation) => (
          <button
            className="operation"
            onClick={() => {
              onClickOperation(operation);
            }}
            key={operation}
          >
            {operation}
          </button>
        ))}
        <button id="calculate-button" onClick={onClickEqualOperation}>
          =
        </button>
      </div>
    </>
  );
});

export default Operation;
