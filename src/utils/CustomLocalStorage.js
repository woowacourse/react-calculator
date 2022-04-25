import { ERROR_MESSAGE } from '../constants';

export const CustomLocalStorage = {
  load(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      localStorage.removeItem(key);
      alert(ERROR_MESSAGE.FAIL_TO_GET_DATA);
    }
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
