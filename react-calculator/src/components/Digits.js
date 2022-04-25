import React from "react";
import Digit from "../elements/Digit";
import { DIGITS } from "../constants";

function Digits({ onClickDigit }) {
  return (
    <div className="digits flex">
      {DIGITS.map((digit, index) => {
        return <Digit digit={digit} key={index} onClickDigit={onClickDigit} />;
      })}
    </div>
  );
}

export default Digits;
