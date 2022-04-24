import PropTypes from 'prop-types';

export default function CalculatorButton(props) {
  return (
    <button className={props.class} onClick={props.onClick}>
      {props.content}
    </button>
  );
}

CalculatorButton.propTypes = {
  class: PropTypes.string,
  onClick: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
