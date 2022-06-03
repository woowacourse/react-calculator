import React from "react";

function Operation({ handleClickClearButton, handleClickOperation }) {
  return (
    <>
      <div className="modifiers subgrid">
        <button
          className="modifier"
          id="clear-button"
          onClick={handleClickClearButton}
        >
          AC
        </button>
      </div>
      <div className="operations subgrid" onClick={handleClickOperation}>
        <button className="operation" data-operator="/">
          /
        </button>
        <button className="operation" data-operator="x">
          X
        </button>
        <button className="operation" data-operator="-">
          -
        </button>
        <button className="operation" data-operator="+">
          +
        </button>
        <button id="calculate-button">=</button>
      </div>
    </>
  );
}

export default Operation;
