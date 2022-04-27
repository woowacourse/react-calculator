const OPERATORS = ['/', 'X', '-', '+', '='];

function OperatorButtons({ setOperators }) {
  const handleOperator = (e) => {
    setOperators(e.target.dataset.operator);
  };

  return (
    <div className="operations subgrid" onClick={handleOperator}>
      {OPERATORS.map((operator) => (
        <button key={operator} className="operation" data-operator={operator}>
          {operator}
        </button>
      ))}
    </div>
  );
}

export default OperatorButtons;
