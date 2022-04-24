import React from "react";

function ClearButton(props) {
  return (
    <div className="modifiers subgrid">
      <button
        className="modifier"
        onClick={() => {
          props.setScreenNumber(0);
          props.setRecordNumber(0);
        }}
      >
        AC
      </button>
    </div>
  );
}

export default ClearButton;
