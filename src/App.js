import { Component } from 'react';
import Calculator from './components/Calculator';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Calculator></Calculator>
      </div>
    );
  }
}

export default App;
