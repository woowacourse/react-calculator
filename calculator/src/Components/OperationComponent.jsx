import React from "react";

import OperationButtonComponent from "./OperationButtonComponent";
import { BUTTON_TYPES } from "../constant";

export default function OperationComponent({ calculateInfo, onClick }) {
  return (
    <div className="operations subgrid" onClick={onClick}>
      {BUTTON_TYPES.OPERATIONS.map((operation) => (
        <OperationButtonComponent
          key={operation}
          isFocused={calculateInfo.operation === operation}
          operation={operation}
        />
      ))}
    </div>
  );
}
