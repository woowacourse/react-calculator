const OPERATIONS = ['/', 'X', '-', '+', '='];

// eslint-disable-next-line react/prop-types
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

export default Operations;
