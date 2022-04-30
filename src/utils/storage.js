export const save = (key, input) => localStorage.setItem(key, JSON.stringify(input));

export const load = key => JSON.parse(localStorage.getItem(key));
