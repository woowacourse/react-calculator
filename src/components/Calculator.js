import React, { Component } from 'react';
import NumberButtons from './NumberButtons';
import OperatorButtons from './OperandButtons';
import { expressionStorage } from '../store/store';
import {
  NUMBER_LIMIT,
  ERROR_MSG,
  CONFIRM_MSG,
  OPERATOR,
  OPERATOR_LIST,
} from '../constants/constant';
import AllClearButton from './AllCearButton';
import Screen from './Screen';
class Calculator extends Component {
  constructor() {
    super();
    window.addEventListener('beforeunload', this.confirmExist);
  }
  state = {
    sum: '',
    prevNumber: [],
    operator: '',
    nextNumber: [],
  };

  componentDidMount() {
    const expression = expressionStorage.getExpression();
    if (!expression) {
      return;
    }
    const { sum, prevNumber, operator, nextNumber } = expression;
    this.setState({ sum, prevNumber, operator, nextNumber });
  }

  confirmExist = (e) => {
    e.preventDefault();
    e.returnValue = CONFIRM_MSG;
    const { sum, prevNumber, operator, nextNumber } = this.state;
    expressionStorage.setExpression({ sum, prevNumber, operator, nextNumber });
  };

  onClickNumber = (e) => {
    const number = e.target.dataset.number;
    const isPrev = this.state.operator === '';
    try {
      if (isPrev) {
        if (this.state.prevNumber.length >= NUMBER_LIMIT) {
          throw new Error(ERROR_MSG.OVER_NUMBER_LIMIT);
        }
        this.setState({ prevNumber: [...this.state.prevNumber, number] });
        return;
      }
      if (this.state.nextNumber.length >= NUMBER_LIMIT) {
        throw new Error(ERROR_MSG.OVER_NUMBER_LIMIT);
      }
      this.setState({ nextNumber: [...this.state.nextNumber, number] });
    } catch ({ message }) {
      alert(message);
    }
  };

  onClickOperator = (e) => {
    const operand = e.target.dataset.operator;
    if (operand === OPERATOR.EQUAL) {
      const prevNumbers = Number(this.state.prevNumber.join(''));
      const nextNumbers = Number(this.state.nextNumber.join(''));
      switch (this.state.operator) {
        case OPERATOR.PLUS:
          this.setState({ sum: prevNumbers + nextNumbers });
          break;
        case OPERATOR.SUBSTRACT:
          this.setState({ sum: prevNumbers - nextNumbers });
          break;
        case OPERATOR.MULTI:
          this.setState({ sum: prevNumbers * nextNumbers });
          break;
        case OPERATOR.DIVIDE:
          if (!isFinite(prevNumbers / nextNumbers)) {
            this.setState({ sum: ERROR_MSG.INFINITY });
            break;
          }
          this.setState({ sum: prevNumbers / nextNumbers });
        default:
          return;
      }
    }
    this.setState({ operator: operand });
  };

  onClickAllClear = () => {
    this.setState({
      sum: '',
      prevNumber: [],
      operator: '',
      nextNumber: [],
    });
  };

  render() {
    return (
      <div id='app'>
        <div className='calculator'>
          <Screen state={this.state} func={this.onClickAllClear} />
          <div className='digits flex'>
            {Array.from({ length: 10 }).map((_, index) => (
              <NumberButtons key={index} func={this.onClickNumber} number={-(index - 9)} />
            ))}
          </div>
          <div className='modifiers subgrid'>
            <AllClearButton func={this.onClickAllClear} />
          </div>
          <div className='operations subgrid'>
            {OPERATOR_LIST.map((operand, index) => (
              <OperatorButtons key={index} operator={operand} func={this.onClickOperator} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
