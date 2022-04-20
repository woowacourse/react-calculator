import React, { Component } from 'react';

class NumberButtons extends Component {
  onClickNumber = (event) => {
    this.props.func(event);
  };

  render() {
    return (
      <button className='digit' data-number={this.props.number} onClick={this.onClickNumber}>
        {this.props.number}
      </button>
    );
  }
}

export default NumberButtons;
