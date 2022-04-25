function Operations() {
  return ['/', 'X', '-', '+', '='].map((operation, idx) => (
    <button className='operation' key={idx}>
      {operation}
    </button>
  ));
}

export default Operations;
