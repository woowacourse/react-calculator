export const LOCAL_STORAGE_KEY = 'calculator';
export const DIGITS = {
  ORDERED_LIST: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  MAX_LENGTH: 3,
};
export const NUMBERS = {
  MAX_COUNT: 2,
};
export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: 'X',
  DIVIDE: '/',
  EQUAL: '=',
  ORDERED_LIST: ['+', '-', 'X', '/', '='],
};
export const MODIFIERS = {
  AC: 'AC',
  ORDERED_LIST: ['AC'],
};
export const DEFAULT_STATE = {
  numberStrings: [''],
  operator: null,
  displayedText: '0',
};
export const ERROR_RESULT = '오류';
export const ERROR_MESSAGES = {
  DIGIT_MAX_LENGTH_EXCEEDED: '입력한 수가 세자리를 초과했습니다.',
  NO_SECOND_NUMBER_SUBMITTED: '두번째 수가 입력되지 않았습니다.',
  INVALID_OPERATOR: '올바르지 않은 연산자입니다.',
};
