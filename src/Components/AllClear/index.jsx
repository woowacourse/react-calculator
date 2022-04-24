import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Container from './styles';

function AllClearButton({ onClick }) {
  return (
    <Container>
      <Button type="button" className="modifier" onClick={onClick}>
        AC
      </Button>
    </Container>
  );
}

AllClearButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(AllClearButton);
