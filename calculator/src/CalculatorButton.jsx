const CalculatorButton = (props) => {
  return (
    <button className={props.kind} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default CalculatorButton;
