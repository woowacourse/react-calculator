import { INIT_STATE } from './constants';

export function loadStateLocal() {
  return JSON.parse(localStorage.getItem('state')) ?? { ...INIT_STATE };
}

export function saveStateLocal(state) {
  localStorage.setItem('state', JSON.stringify(state));
}
