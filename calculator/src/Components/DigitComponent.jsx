import React from "react";

import { SCREEN } from "../constant";

export default function DigitComponent({ calculateInfo, setCalculateInfo }) {
  const digitNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  const handleDigitButton = ({ target }) => {
    if (
      String(calculateInfo.firstNumber).length >= SCREEN.MAX_TEXT_LENGTH &&
      calculateInfo.operation === ""
    ) {
      return;
    }

    if (String(calculateInfo.secondNumber).length >= SCREEN.MAX_TEXT_LENGTH) {
      return;
    }

    if (calculateInfo.operation) {
      const prevNumber = calculateInfo.secondNumber;

      setCalculateInfo((prevCalculateInfo) => ({
        ...prevCalculateInfo,
        secondNumber: Number(prevNumber + target.textContent),
      }));

      return;
    }

    const prevNumber = calculateInfo.firstNumber;

    setCalculateInfo((prevCalculateInfo) => ({
      ...prevCalculateInfo,
      firstNumber: isNaN(prevNumber)
        ? target.textContent
        : Number(prevNumber + target.textContent),
    }));
  };

  return (
    <div className="digits flex" onClick={handleDigitButton}>
      {digitNumbers.map((digitNumber) => (
        <button key={digitNumber} className="digit">
          {digitNumber}
        </button>
      ))}
    </div>
  );
}
