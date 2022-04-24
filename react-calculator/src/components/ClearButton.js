import React from "react";

function ClearButton({ setScreenNumber, setRecordNumber, setOperatorClicked }) {
  return (
    <div className="modifiers subgrid">
      <button
        className="modifier"
        onClick={() => {
          setScreenNumber(0);
          setRecordNumber(0);
          setOperatorClicked("");
        }}
      >
        AC
      </button>
    </div>
  );
}

export default ClearButton;
