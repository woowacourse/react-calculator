import { memo } from "react";

const OperatorButton = ({ operator, onClickOperator }) => {
  return (
    <button className="operation" onClick={onClickOperator}>
      {operator}
    </button>
  );
};

export default memo(OperatorButton);
