import React, { Component } from 'react';
import Operator from '../elements/Operator';

export default class Operators extends Component {
  constructor() {
    super();
    this.state = {
      operators: ['/', 'X', '-', '+', '='],
      operator: '',
      firstNumber: 0,
    };
  }

  onClickOperator = (operator) => {
    if (operator !== '=') {
      if (this.props.숫자입력중 && this.state.firstNumber !== 0) {
        alert(
          "숫자는 2개까지만 입력할 수 있습니다. '='버튼을 눌러 계산을 해주세요."
        );
        return;
      }
      this.props.changeStep(false);
      this.setState({ firstNumber: this.props.screenNumber });
      this.setState({ operator });
      return;
    }

    this.props.changeStep(false);
    this.setState({
      firstNumber: 0,
      operator: '',
    });

    switch (this.state.operator) {
      case '+':
        this.props.changeScreenNumber(
          this.state.firstNumber + this.props.screenNumber
        );
        break;
      case '-':
        this.props.changeScreenNumber(
          this.state.firstNumber - this.props.screenNumber
        );
        break;
      case 'X':
        this.props.changeScreenNumber(
          this.state.firstNumber * this.props.screenNumber
        );
        break;
      case '/':
        if (this.props.screenNumber === 0) {
          this.props.changeScreenNumber('오류');
          return;
        }
        this.props.changeScreenNumber(
          Math.floor(this.state.firstNumber / this.props.screenNumber)
        );
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="operations subgrid">
        {this.state.operators.map((operator, index) => (
          <Operator
            onClickOperator={this.onClickOperator}
            operator={operator}
            key={index}
          />
        ))}
      </div>
    );
  }
}
