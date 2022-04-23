import React from "react";

export default function AllClearComponent({ onClick }) {
  return (
    <div className="modifiers subgrid">
      <button className="modifier" onClick={onClick}>
        AC
      </button>
    </div>
  );
}
