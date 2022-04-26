import React from "react";
import { DIGIT_NUMBER_LIST } from "../constants/constant";

const NumberButtons = (props) => {
  return (
    <div className="digits flex">
      {DIGIT_NUMBER_LIST.map((digit, index) => (
        <button className="digit" key={index} onClick={props.onClick}>
          {digit}
        </button>
      ))}
    </div>
  );
};

export default NumberButtons;
