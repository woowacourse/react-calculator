function DigitButtons(digit) {
  const handleClickDigit = function handleClickDigit(digit) {
    if (this.state.operand[0] === '오류') {
      alert('오류입니다. AC를 눌러 값을 초기화해주세요.');
      return;
    }

    if (+(this.state.operand[this.state.index] + digit) >= 1000) {
      alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다.');
      return;
    }

    switch (this.state.index) {
      case 0:
        this.setState(prevState => ({
          operand: [String(+(prevState.operand[0] + digit)), ''],
        }));
        break;

      case 1:
        this.setState(prevState => ({
          operand: [String(+prevState.operand[0]), String(+(prevState.operand[1] + digit))],
        }));
        break;

      default:
        break;
    }
  };

  return (
    <button className="digit" type="button" onClick={this.handleClickDigit.bind(this, digit)}>
      {i}
    </button>
  );
}
