import React from "react";

const OperatorButton = ({ operator }) => {
  return <button className="operation">{operator}</button>;
};

export default React.memo(OperatorButton);
