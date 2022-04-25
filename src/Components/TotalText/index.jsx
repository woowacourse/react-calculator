import PropTypes from 'prop-types';
import React from 'react';
import Container from './styles';

function TotalText({ children }) {
  return <Container>{children === Infinity ? '오류' : children}</Container>;
}

TotalText.defaultProps = {
  children: '0',
};

TotalText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(TotalText);
