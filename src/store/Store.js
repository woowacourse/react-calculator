import { LOCAL_STORAGE_KEY } from '../constants/constants';

const store = {
  key: LOCAL_STORAGE_KEY,
  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },
  load() {
    return JSON.parse(localStorage.getItem(this.key));
  },
};

export default store;
