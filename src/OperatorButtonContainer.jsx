function OperatorButtonContainer({ handleOperation }) {
  return (
    <div className="operations subgrid" onClick={handleOperation}>
      <button className="operation" data-operator="/">
        /
      </button>
      <button className="operation" data-operator="x">
        X
      </button>
      <button className="operation" data-operator="-">
        -
      </button>
      <button className="operation" data-operator="+">
        +
      </button>
      <button id="calculate-button" data-operator="=">
        =
      </button>
    </div>
  );
}

export default OperatorButtonContainer;
