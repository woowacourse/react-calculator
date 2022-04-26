import React from "react";

export const Screen = (props) => {
  const { prevNumber, operator, nextNumber, sum } = props.info;
  return (
    <h1 className="total">
      {sum === "" ? [...prevNumber, ...operator, ...nextNumber] : sum}
    </h1>
  );
};

export default Screen;
