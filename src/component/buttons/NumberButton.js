import { numberOfButtons, MaxButtonNumber } from "../../constants/constants";

export default function NumberButton(props) {
  return (
    <div className="digits flex" onClick={props.onClick}>
      {Array.from({ length: numberOfButtons }, (_, i) => (
        <button className="digit" key={MaxButtonNumber - i}>
          {MaxButtonNumber - i}
        </button>
      ))}
    </div>
  );
}
