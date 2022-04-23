import React, { useEffect, useState } from "react";

import "./App.css";

import DigitComponent from "./Components/DigitComponent";
import OperationComponent from "./Components/OperationComponent";
import AllClearComponent from "./Components/AllClearComponent";

import { SCREEN } from "./constant";

export default function App() {
  const prevCalculateInfo = JSON.parse(
    localStorage.getItem("calculateInfo")
  ) ?? {
    firstNumber: 0,
    operation: "",
    secondNumber: "",
  };

  useEffect(() => {
    window.addEventListener("beforeunload", confirmLeaveSite);

    return window.removeEventListener("unload", confirmLeaveSite);
  }, []);

  const [calculateInfo, setCalculateInfo] = useState(prevCalculateInfo);

  useEffect(() => {
    localStorage.setItem("calculateInfo", JSON.stringify(calculateInfo));
  }, [calculateInfo]);

  const convertToLocaleString = (number) => {
    return number.toLocaleString("ko-KR");
  };

  const confirmLeaveSite = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  return (
    <div className="calculator">
      <h1
        className="total"
        style={{
          fontSize:
            String(calculateInfo.secondNumber || calculateInfo.firstNumber)
              .length > SCREEN.FONT_SIZE_SCALE_STANDARD
              ? "3rem"
              : "4rem",
        }}
      >
        {convertToLocaleString(
          calculateInfo.secondNumber || calculateInfo.firstNumber
        )}
      </h1>
      <DigitComponent
        calculateInfo={calculateInfo}
        setCalculateInfo={setCalculateInfo}
      />
      <AllClearComponent setCalculateInfo={setCalculateInfo} />
      <OperationComponent
        calculateInfo={calculateInfo}
        setCalculateInfo={setCalculateInfo}
      />
    </div>
  );
}
