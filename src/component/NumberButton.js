import React from "react";

const NumberButton = ({ number }) => {
  return <button className="digit">{number}</button>;
};

export default React.memo(NumberButton);
