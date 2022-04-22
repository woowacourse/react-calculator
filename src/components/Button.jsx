import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button
        className={this.props.className}
        onClick={() => {
          this.props.onClick(this.props.text);
        }}
        type="button"
      >
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
