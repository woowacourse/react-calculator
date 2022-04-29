export default function ACButtons({ resetExpression }) {
  return (
    <div className="modifiers subgrid" onClick={resetExpression}>
      <button className="modifier" id="clear-button">
        AC
      </button>
    </div>
  );
}
