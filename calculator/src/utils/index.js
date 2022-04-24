export const limitThreeDecimal = (number) => {
  if (Number.isInteger(number)) return number;

  return number.toFixed(3);
};
