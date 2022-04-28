import { INIT_STATE } from './constants';

export function loadCalculationProgressLocal() {
  return JSON.parse(localStorage.getItem('state')) ?? { ...INIT_STATE };
}

export function saveCalculationProgressLocal(state) {
  localStorage.setItem('state', JSON.stringify(state));
}
