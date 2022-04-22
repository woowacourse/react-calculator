export const tryCatcher = (func) => {
  return (...args) => {
    try {
      func(...args);
    } catch (error) {
      alert(error);
    }
  };
};
