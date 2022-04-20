import React, { Component } from 'react';

class AllClearButton extends Component {
  onClickAllClear = (event) => {
    this.props.func(event);
  };

  render() {
    return (
      <button className='modifier' onClick={this.onClickAllClear}>
        AC
      </button>
    );
  }
}

export default AllClearButton;
