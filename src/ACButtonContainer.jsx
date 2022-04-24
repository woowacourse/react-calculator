function ACButtonContainer({ clearResult }) {
  return (
    <div className="modifiers subgrid" onClick={clearResult}>
      <button className="modifier" id="clear-button">
        AC
      </button>
    </div>
  );
}

export default ACButtonContainer;
