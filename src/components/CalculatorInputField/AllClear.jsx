import React from 'react';

class AllClear extends React.Component {
  render() {
    return (
      <div className="modifiers subgrid">
        <button className="modifier" onClick={this.props.handleClickAC}>
          AC
        </button>
      </div>
    );
  }
}

export default AllClear;
