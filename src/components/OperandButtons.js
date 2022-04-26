import React from "react";
import { OPERATOR_LIST } from "../constants/constant";

const OperatorButtons = (props) => {
  return (
    <div className="operations subgrid">
      {OPERATOR_LIST.map((operand, index) => (
        <button className="operation" onClick={props.onClick} key={index}>
          {operand}
        </button>
      ))}
    </div>
  );
};

export default OperatorButtons;
