import React, { Component } from 'react';
export default class ClearButton extends Component {
  render() {
    return (
      <div className="modifiers subgrid">
        <button
          className="modifier"
          onClick={(e) => {
            this.props.changeScreenNumber(0);
            this.props.resetFirstNumber();
          }}
        >
          AC
        </button>
      </div>
    );
  }
}
