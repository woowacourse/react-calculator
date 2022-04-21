export const expressionStorage = {
  setExpression(expression) {
    localStorage.setItem('expression', JSON.stringify(expression));
  },

  getExpression() {
    return JSON.parse(localStorage.getItem('expression'));
  },
};
