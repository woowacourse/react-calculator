import { LOCAL_STORAGE_KEY } from '../constant';

export const storage = {
  getStoredOperations: () => {
    const {
      prevNumber = 0,
      nextNumber = null,
      operator = '',
    } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {};

    return { prevNumber, nextNumber, operator };
  },
  saveOperations: (operations) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(operations));
  },
};
