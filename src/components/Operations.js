import PropTypes from 'prop-types';
const OPERATIONS = ['/', 'X', '-', '+', '='];

const Operations = ({ onClick }) => {
  return (
    <div className="operations subgrid">
      {OPERATIONS.map((operation) => (
        <button
          className="operation"
          onClick={onClick(operation)}
          key={operation}
        >
          {operation}
        </button>
      ))}
    </div>
  );
};

Operations.propTypes = {
  onClick: PropTypes.func,
};

export default Operations;
