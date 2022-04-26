import { operations } from "../../constants/constants";

export default function OperatorButton(props) {
  return (
    <div className="operations subgrid" onClick={props.onClick}>
      {Array.from(operations, (v, _) => (
        <button className="digit" key={v}>
          {v}
        </button>
      ))}
    </div>
  );
}
