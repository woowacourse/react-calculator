import React from 'react';
import Button from '../Button';

function AllClear({ handleClickAC }) {
  return (
    <div className="modifiers subgrid">
      <Button className="modifier" handleClick={handleClickAC}>
        AC
      </Button>
    </div>
  );
}

export default AllClear;
