const operationList = ["/", "X", "-", "+"];

const OperationComponent = ({ calculateInfo, handleOperationButton }) => {
  return (
    <>
      <div className="operations subgrid" onClick={handleOperationButton}>
        {operationList.map((operaton) => (
          <button
            key={operaton}
            className={
              calculateInfo.operation === `${operaton}`
                ? "operation--focused"
                : "operation"
            }
          >
            {operaton}
          </button>
        ))}
        <button className="operation">=</button>
      </div>
    </>
  )
}

export default OperationComponent;
