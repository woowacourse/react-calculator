import React from "react";

const NumberButton = ({ number, onClickNumber }) => {
  return (
    <button className="digit" onClick={onClickNumber}>
      {number}
    </button>
  );
};

export default React.memo(NumberButton);
