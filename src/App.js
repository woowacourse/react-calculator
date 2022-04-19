function App() {
  return (
    <div className="App">
      <div className="calculator">
        <h1 id="total">0</h1>
        <div className="digits flex">
          <button className="digit" data-value="9">
            9
          </button>
          <button className="digit" data-value="8">
            8
          </button>
          <button className="digit" data-value="7">
            7
          </button>
          <button className="digit" data-value="6">
            6
          </button>
          <button className="digit" data-value="5">
            5
          </button>
          <button className="digit" data-value="4">
            4
          </button>
          <button className="digit" data-value="3">
            3
          </button>
          <button className="digit" data-value="2">
            2
          </button>
          <button className="digit" data-value="1">
            1
          </button>
          <button className="digit" data-value="0">
            0
          </button>
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" id="clear-button">
            AC
          </button>
        </div>
        <div className="operations subgrid">
          <button className="operation" data-operator="/">
            /
          </button>
          <button className="operation" data-operator="x">
            X
          </button>
          <button className="operation" data-operator="-">
            -
          </button>
          <button className="operation" data-operator="+">
            +
          </button>
          <button id="calculate-button">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
