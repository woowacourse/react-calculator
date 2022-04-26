import PropTypes from 'prop-types';
import { memo } from 'react';

const Modifier = ({ onClick }) => {
  return (
    <div className="modifiers subgrid">
      <button className="modifier" onClick={onClick}>
        AC
      </button>
    </div>
  );
};

Modifier.propTypes = {
  onClick: PropTypes.func,
};

export default memo(Modifier);
