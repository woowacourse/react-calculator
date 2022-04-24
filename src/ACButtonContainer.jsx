function ACButtonContainer({ resetExpression }) {
  return (
    <div className="modifiers subgrid" onClick={resetExpression}>
      <button className="modifier" id="clear-button">
        AC
      </button>
    </div>
  );
}

export default ACButtonContainer;
