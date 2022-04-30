const storage = {
  loadData: (key) => {
    const savedData = localStorage.getItem(key);

    return savedData && JSON.parse(savedData);
  },
  saveData: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export default storage;
