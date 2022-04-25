import PropTypes from 'prop-types';
import { DIGIT_LIST } from '../../Constants';

import Container from './styles';

function DigitButton({ onClickDigit }) {
  return (
    <div className="digits flex">
      {DIGIT_LIST.map((digit) => (
        <Container type="button" key={digit} className="digit" onClick={() => onClickDigit(digit)}>
          {digit}
        </Container>
      ))}
    </div>
  );
}

DigitButton.propTypes = {
  onClickDigit: PropTypes.func.isRequired,
};

export default DigitButton;
