import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button className={this.props.className} type="button">
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
