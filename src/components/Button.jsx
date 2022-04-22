import React, { Component } from 'react';

class Button extends Component {
  componentDidMount() {}

  render() {
    const { text, className } = this.props;

    return (
      <button type="button" className={className}>
        {text}
      </button>
    );
  }
}

export default Button;
