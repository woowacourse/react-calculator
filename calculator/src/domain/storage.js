import { LOCAL_STORAGE_KEY } from '../constant';

export const storage = {
  getStoredOperations: function (key) {
    return JSON.parse(localStorage.getItem(key)) ?? {};
  },
  storeOperations: function (operations) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(operations));
  },
};
