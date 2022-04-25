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
  numbers: [0],
  operator: null,
};
export const ERROR_RESULT = '오류';
export const ERROR_MESSAGES = {
  DIGIT_MAX_LENGTH_EXCEEDED: '입력한 수가 세자리를 초과했습니다.',
  NUMBERS_MAX_COUNT_EXCEEDED: '두 수만 연산할 수 있습니다.',
  INVALID_OPERATOR: '올바르지 않은 연산자입니다.',
};
