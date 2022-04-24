import React, { Component } from 'react';

export default class AllClearButton extends Component {
  render() {
    return (
      <div className="modifiers subgrid">
        <button
          type="button"
          className="modifier"
          onClick={() => this.props.clearState()}
        >
          AC
        </button>
      </div>
    );
  }
}
