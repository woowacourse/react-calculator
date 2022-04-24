export const limitThreeDecimal = (number) => {
  if (Number.isInteger(number)) return number;

  return parseFloat(number.toFixed(3));
};
