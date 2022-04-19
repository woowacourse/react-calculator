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
    // 값이 입력되었을때에만 두번째 값을 받는다.
    if (this.props.screenNumber === 0) {
      return;
    }

    if (operator !== '=') {
      // 숫자 입력중 & 연산자 이미 있음
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

    // '=' 클릭 시 초기화를 해준다.
    this.props.changeStep(false);
    this.setState({
      firstNumber: 0,
      operator: '',
    });

    // 결과값을 스크린에 보여준다.
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
