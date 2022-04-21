import React, { Component } from 'react';
export default class ClearButton extends Component {
  render() {
    return (
      <div className="modifiers subgrid">
        <button
          className="modifier"
          onClick={() => {
            this.props.setScreenNumber(0);
            this.props.setRecordNumber(0);
          }}
        >
          AC
        </button>
      </div>
    );
  }
}
