import React from 'react'
import DigitComponent from '../components/DigitComponent';
import { SCREEN } from "../constant";

const DigitWrapper = ({ calculateInfo, setCalculateInfo }) => {
  const handleDigitButton = ({ target }) => {
    if (
      String(calculateInfo.firstNumber).length >=
        SCREEN.MAX_TEXT_LENGTH &&
      calculateInfo.operation === ""
    ) {
      return;
    }

    if (
      String(calculateInfo.secondNumber).length >=
      SCREEN.MAX_TEXT_LENGTH
    ) {
      return;
    }

    if (calculateInfo.operation) {
      const prevNumber = calculateInfo.secondNumber;

      setCalculateInfo({ ...calculateInfo, secondNumber: Number(prevNumber + target.textContent) });

      return;
    }

    const prevNumber = calculateInfo.firstNumber;
    const editFirstNumber = isNaN(prevNumber)
        ? target.textContent
        : Number(prevNumber + target.textContent);

    setCalculateInfo({ ...calculateInfo, firstNumber: editFirstNumber });
  }

  return (
    <>
      <DigitComponent
        handleDigitButton={handleDigitButton}
      />
    </>
  )
}

export default DigitWrapper