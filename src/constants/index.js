const MAX_NUMBER_LENGTH = 3;

const ERROR_MESSAGE = {
  EXCEED_MAX_NUMBER_LENGTH: `${MAX_NUMBER_LENGTH}자리수를 초과하였습니다.`,
  ALLOW_ONE_OPERATOR: '연산자는 하나만 입력할 수 있습니다.',
  STRANGE_OPERATOR(operator) {
    return `${operator} 연산자는 존재하지 않습니다`;
  },
  FAIL_TO_GET_DATA: '데이터를 불러오는 데 실패하였습니다.',
};

const INFINITY_CASE_TEXT = '오류';

const LOCAL_STORAGE_EXPRESSION_KEY = 'expression';

const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const OPERATORS = {
  DIVIDE: '/',
  MULTIPLY: 'X',
  MINUS: '-',
  PLUS: '+',
  EQUAL: '=',
};

export {
  MAX_NUMBER_LENGTH,
  ERROR_MESSAGE,
  INFINITY_CASE_TEXT,
  LOCAL_STORAGE_EXPRESSION_KEY,
  DIGITS,
  OPERATORS,
};
