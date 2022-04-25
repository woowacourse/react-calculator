export default function ModifierButton(props) {
  return (
    <div className="modifiers subgrid" onClick={props.onClick}>
      <button className="modifier">AC</button>
    </div>
  );
}
