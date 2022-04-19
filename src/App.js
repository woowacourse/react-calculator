import './App.css';

function App() {
  const digitButtons = Array.from({ length: 10 }).map((val, index) => {
    const buttonNumber = 9 - index;
    return (
      <button key={buttonNumber} className="digit">
        {buttonNumber}
      </button>
    );
  });
  return (
    <div className="App">
      <div className="calculator">
        <h1 id="total">0</h1>
        <div className="digits flex">{digitButtons}</div>
        <div className="modifiers subgrid">
          <button className="modifier">AC</button>
        </div>
        <div className="operations subgrid">
          <button className="operation">/</button>
          <button className="operation">X</button>
          <button className="operation">-</button>
          <button className="operation">+</button>
          <button className="operation">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
