import React, { Component } from 'react';

class DigitButton extends Component {
  componentDidMount() {}

  render() {
    const { number } = this.props;
    return (
      <button type="button" className="digit">
        {number}
      </button>
    );
  }
}

export default DigitButton;
