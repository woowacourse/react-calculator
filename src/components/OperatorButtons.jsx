export default function OperatorButtons({ updateOperation }) {
  const onClickOperationButton = (e) => {
    const newOperation = e.target.value;
    updateOperation(newOperation);
  };

  return (
    <div className="operations subgrid" onClick={onClickOperationButton}>
      <button className="operation" value="/">
        /
      </button>
      <button className="operation" value="x">
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
