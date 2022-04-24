import React from "react";
import Digit from "../elements/Digit";
import { DIGITS } from "../constants";

function Digits(props) {
  return (
    <div className="digits flex">
      {DIGITS.map((digit, index) => {
        return (
          <Digit digit={digit} key={index} onClickDigit={props.onClickDigit} />
        );
      })}
    </div>
  );
}

export default Digits;
