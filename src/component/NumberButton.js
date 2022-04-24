import { memo } from "react";

const NumberButton = ({ number, onClickNumber }) => {
  return (
    <button className="digit" onClick={onClickNumber}>
      {number}
    </button>
  );
};

export default memo(NumberButton);
