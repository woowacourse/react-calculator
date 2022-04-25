export default function OperatorButton(props) {
  return (
    <div className="operations subgrid" onClick={props.onClick}>
      {Array.from(["/", "X", "-", "+", "="], (v, i) => (
        <button className="digit" key={v}>
          {v}
        </button>
      ))}
    </div>
  );
}
