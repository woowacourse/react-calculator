import React from "react";

import { BUTTON_TYPES } from "../constant";

export default function DigitComponent({ onClick }) {
  return (
    <div className="digits flex" onClick={onClick}>
      {BUTTON_TYPES.DIGIT_NUMBERS.map((digitNumber) => (
        <button key={digitNumber} className="digit">
          {digitNumber}
        </button>
      ))}
    </div>
  );
}
