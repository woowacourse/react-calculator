import React from 'react';

class Operations extends React.Component {
  render() {
    return ['/', 'X', '-', '+', '='].map((operation, idx) => (
      <button className='operation' key={idx}>
        {operation}
      </button>
    ));
  }
}

export default Operations;
