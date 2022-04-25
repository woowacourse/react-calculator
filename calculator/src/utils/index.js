export const upToThreeDecimalPoint = (number) => {
  if (Number.isInteger(number)) return number;

  return parseFloat(number.toFixed(3));
};
