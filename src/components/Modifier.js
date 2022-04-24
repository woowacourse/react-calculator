import { memo } from 'react';
// eslint-disable-next-line react/prop-types
const Modifier = ({ onClick }) => {
  return (
    <div className="modifiers subgrid">
      <button className="modifier" onClick={onClick}>
        AC
      </button>
    </div>
  );
};

export default memo(Modifier);
