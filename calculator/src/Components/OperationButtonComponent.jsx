import React from "react";

export default function OperationButtonComponent({ operation, isFocused }) {
  const className = isFocused ? "operation--focused" : "operation";

  return <button className={className}>{operation}</button>;
}
