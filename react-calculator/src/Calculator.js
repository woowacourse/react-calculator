import React, { useState, useEffect } from "react";
import ClearButton from "./components/ClearButton";
import Digits from "./components/Digits";
import Operators from "./components/Operators";
import Screen from "./components/Screen";
import { isOverMaxLength } from "./validator/index";

function Calculator() {
  const [screenNumber, setScreenNumber] = useState(
    +localStorage.getItem("calculator-data") || 0
  );
  const [recordNumber, setRecordNumber] = useState(0);
  const [isNumberStep, setIsNumberState] = useState(true);
  const [operatorClicked, setOperatorClicked] = useState("");

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  const onClickDigit = (enteredDigit) => {
    setOperatorClicked("");

    if (!isNumberStep) {
      setScreenNumber(enteredDigit);
      setIsNumberState(true);
      return;
    }
    const prevNumber = screenNumber;
    if (!isOverMaxLength(prevNumber)) {
      setScreenNumber(prevNumber * 10 + enteredDigit);
    }
  };

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    if (isFinite(screenNumber)) {
      localStorage.setItem("calculator-data", JSON.stringify(screenNumber));
    }
    e.returnValue = "";
  };

  return (
    <div className="calculator">
      <Screen screenNumber={screenNumber} />
      <Digits onClickDigit={onClickDigit} />
      <Operators
        setScreenNumber={setScreenNumber}
        screenNumber={screenNumber}
        setStep={setIsNumberState}
        isNumberStep={isNumberStep}
        recordNumber={recordNumber}
        setRecordNumber={setRecordNumber}
        clicked={operatorClicked}
        setOperatorClicked={setOperatorClicked}
      />
      <ClearButton
        setScreenNumber={setScreenNumber}
        setRecordNumber={setRecordNumber}
        setOperatorClicked={setOperatorClicked}
      />
    </div>
  );
}

export default Calculator;
