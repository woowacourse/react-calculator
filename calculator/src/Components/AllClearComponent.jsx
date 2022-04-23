import React from "react";

export default function AllClearComponent({ setCalculateInfo }) {
  const handleAllClear = () => {
    setCalculateInfo(() => ({
      firstNumber: 0,
      operation: "",
      secondNumber: "",
    }));
  };

  return (
    <div className="modifiers subgrid">
      <button className="modifier" onClick={handleAllClear}>
        AC
      </button>
    </div>
  );
}
