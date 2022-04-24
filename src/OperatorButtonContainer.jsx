function OperatorButtonContainer({ handleOperation }) {
  return (
    <div className="operations subgrid" onClick={handleOperation}>
      <button className="operation" value="/">
        /
      </button>
      <button className="operation" valuer="x">
        X
      </button>
      <button className="operation" value="-">
        -
      </button>
      <button className="operation" value="+">
        +
      </button>
      <button className="operation" value="=">
        =
      </button>
    </div>
  );
}

export default OperatorButtonContainer;
