import React from 'react';

export default function ClearButton({ setScreenNumber, setRecordNumber }) {
  return (
    <div className="modifiers subgrid">
      <button
        className="modifier"
        onClick={() => {
          setScreenNumber(0);
          setRecordNumber(0);
        }}
      >
        AC
      </button>
    </div>
  );
}
