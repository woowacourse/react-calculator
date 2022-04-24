import { LOCAL_STORAGE_KEY } from '../constant';

export const getStoredOperations = () => {
  const {
    prevNumber = 0,
    nextNumber = null,
    operator = '',
  } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? {};

  return { prevNumber, nextNumber, operator };
};

export const saveOperations = (operations) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(operations));
