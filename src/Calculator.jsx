/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import DigitButton from './DigitButton';
import ModifierButton from './ModifierButton';
import OperationButton from './OperationButton';
import Result from './Result';

const digits = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
const operations = ['/', 'X', '-', '+', '='];

const DigitButtons = function (props) {
  const { operand, setOperand, index } = props;
  const digitButtons = digits.map(digit => (
    <DigitButton
      key={digit}
      digit={digit}
      operand={operand}
      setOperand={setOperand}
      index={index}
    />
  ));

  return digitButtons;
};

const OperationButtons = function (props) {
  const { operand, operator, setOperand, setOperator, setIndex } = props;
  const operationButtons = operations.map(operation => (
    <OperationButton
      key={operation}
      operand={operand}
      operation={operation}
      operator={operator}
      setOperand={setOperand}
      setOperator={setOperator}
      setIndex={setIndex}
    />
  ));

  return operationButtons;
};

const Calculator = function () {
  const [operand, setOperand] = useState(['0', '']);
  const [operator, setOperator] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {});

  return (
    <div className="calculator">
      <Result operand={operand} operator={operator} />
      <div className="digits flex">
        <DigitButtons operand={operand} setOperand={setOperand} index={index} />
      </div>
      <div className="modifiers subgrid">
        <ModifierButton setOperand={setOperand} setOperator={setOperator} setIndex={setIndex} />
      </div>
      <div className="operations subgrid">
        <OperationButtons
          operand={operand}
          operator={operator}
          setOperand={setOperand}
          setOperator={setOperator}
          setIndex={setIndex}
        />
      </div>
    </div>
  );
};

export default Calculator;
/*
export default class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      operand: ['0', ''],
      operator: '',
      index: 0,
    };

    window.addEventListener('beforeunload', e => {
      e.preventDefault();
      e.returnValue = '';
    });
  }

  componentDidMount() {
    const localState = JSON.parse(localStorage.getItem('state'));

    if (localState) {
      this.setState({ operand: localState.operand });
      this.setState({ operator: localState.operator });
      this.setState({ index: localState.index });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  calculate(operand, operator) {
    if (!this.state.operator) {
      return;
    }
    let result = null;
    switch (operator) {
      case '+':
        result = +operand[0] + +operand[1];
        break;
      case '-':
        result = +operand[0] - +operand[1];
        break;
      case 'X':
        result = +operand[0] * +operand[1];
        break;
      case '/':
        result = Math.floor(+operand[0] / +operand[1]);
        break;
      default:
        break;
    }

    if (result === Infinity) {
      this.setState({ operand: ['오류', ''] });
      this.setState({ operator: '' });
      return;
    }

    this.setState({ operand: [String(result), ''] });
    this.setState({ operator: '' });
    this.setState({ index: 0 });
  }

}
*/
