const STORAGE_KEY = {
  EXPRESSION: 'expression',
  RESULT: 'result',
};

const EMPTY_VALUE = {
  EXPRESSION: {
    firstOperand: '',
    secondOperand: '',
    operator: '',
  },
  RESULT: '',
};

class Storage {
  #expression;
  #result;

  constructor() {
    this.#expression = this.getInitialValue(STORAGE_KEY.EXPRESSION, EMPTY_VALUE.EXPRESSION);
    this.#result = this.getInitialValue(STORAGE_KEY.RESULT, EMPTY_VALUE.RESULT);
  }

  get expression() {
    return this.#expression;
  }

  get result() {
    return this.#result;
  }

  getInitialValue(key, emptyValue) {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : emptyValue;
  }

  saveExpression(value) {
    localStorage.setItem(STORAGE_KEY.EXPRESSION, JSON.stringify(value));
  }

  saveResult(value) {
    localStorage.setItem(STORAGE_KEY.RESULT, JSON.stringify(value));
  }
}

export default new Storage();
