export const checkMaxNumberLength = (numbers, offset) => {
  if (numbers[offset].length >= 3) {
    throw new Error("숫자는 3자리수까지 입력가능합니다");
  }
};

export const checkValidOperation = (numbers, offset) => {
  if (!numbers[0] || offset > 0) {
    throw new Error("올바른 입력을 해주세요");
  }
};

export const checkValidEqualOperation = (numbers) => {
  if (!numbers[1]) {
    throw new Error("완전한 계산식을 입력하세요");
  }
};
