import React from 'react';

export default function AllClearButton({ handleAllClear }) {
  return (
    <div className="modifiers subgrid">
      <button type="button" className="modifier" onClick={handleAllClear}>
        AC
      </button>
    </div>
  );
}
