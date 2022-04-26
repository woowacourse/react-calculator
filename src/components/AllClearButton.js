import React from "react";

const AllClearButton = (props) => {
  return (
    <div className="modifiers subgrid">
      <button className="modifier" onClick={props.onClick}>
        AC
      </button>
    </div>
  );
};

export default AllClearButton;
