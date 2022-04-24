export const ERROR_MSG = {
  OVER_NUMBER_LIMIT: '숫자는 3자리까지 입력가능합니다',

  INFINITY: '오류',
};

export const NUMBER_LIMIT = 3;

export const CONFIRM_MSG = '정말 창을 닫으시겠습니까?';

export const OPERATOR = {
  MULTI: 'X',
  DIVIDE: '/',
  SUBSTRACT: '-',
  PLUS: '+',
  EQUAL: '=',
};

export const OPERATOR_LIST = [
  OPERATOR.MULTI,
  OPERATOR.DIVIDE,
  OPERATOR.SUBSTRACT,
  OPERATOR.PLUS,
  OPERATOR.EQUAL,
];

export const INITIAL_STATE = {
  sum: '',
  prevNumbers: [],
  operator: '',
  nextNumbers: [],
};
