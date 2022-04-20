import { ERROR_MESSAGE, MAX_NUMBER_LENGTH } from "./constant";

export const checkMaxNumberLength = (numbers, offset) => {
  if (numbers[offset].length >= MAX_NUMBER_LENGTH) {
    throw new Error(ERROR_MESSAGE.EXCEED_MAX_NUMBER_LENGTH);
  }
};

export const checkValidOperation = (numbers, offset) => {
  if (!numbers[0] || offset > 0) {
    throw new Error(ERROR_MESSAGE.VALID_OPERATION);
  }
};

export const checkValidEqualOperation = (numbers) => {
  if (!numbers[1]) {
    throw new Error(ERROR_MESSAGE.COMPLETE_FORMULAR);
  }
};
