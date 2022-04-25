import React from 'react';

function AllClear({ handleClickAC }) {
  return (
    <div className="modifiers subgrid">
      <button className="modifier" onClick={handleClickAC}>
        AC
      </button>
    </div>
  );
}

export default AllClear;
