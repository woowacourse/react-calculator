export default function NumberButton(props) {
  return (
    <div className="digits flex" onClick={props.onClick}>
      {Array.from({ length: 10 }, (_, i) => (
        <button className="digit" key={9 - i}>
          {9 - i}
        </button>
      ))}
    </div>
  );
}
