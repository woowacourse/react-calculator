import PropTypes from 'prop-types';
import Container from './styles';

function Button({ type, className, onClick, children }) {
  return (
    <Container type={type} className={className} onClick={onClick}>
      {children}
    </Container>
  );
}

Button.defaultProps = {
  type: 'button',
  children: '',
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Button;
