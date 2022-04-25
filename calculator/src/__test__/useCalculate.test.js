/* eslint-disable no-unused-vars */
import { renderHook, act } from '@testing-library/react-hooks';
import useCalculate from '../hooks/useCalculate';

const number1 = '6';
const number2 = '3';
const plus = '+';
const minus = '-';
const mutiplication = 'X';
const division = '/';
const equal = '=';

describe('operations 상태가 잘 변하는지 확인한다.', () => {
  test('숫자를 저장할 수 있다.', () => {
    const { result } = renderHook(() => useCalculate());

    act(() => result.current.changeNumber(number1));

    expect(result.current.operations.nextNumber).toBe(Number(number1));
  });

  test('operator를 저장할 수 있다.', () => {
    const { result } = renderHook(() => useCalculate());

    act(() => result.current.calculate(plus));

    expect(result.current.operations.operator).toBe(plus);
  });

  test('연속된 연산에 대하여 state값을 관리할 수 있다.', () => {
    const { result } = renderHook(() => useCalculate());

    act(() => result.current.changeNumber(number1));
    act(() => result.current.calculate(plus));
    act(() => result.current.changeNumber(number2));

    expect(result.current.operations).toEqual({
      prevNumber: Number(number1),
      nextNumber: Number(number2),
      operator: plus,
    });
  });
});

describe('연산을 수행할 수 있다.', () => {
  test('+ 연산을 수행할 수 있다.', () => {
    const { result } = renderHook(() => useCalculate());

    act(() => result.current.changeNumber(number1));
    act(() => result.current.calculate(plus));
    act(() => result.current.changeNumber(number2));
    act(() => result.current.calculate(equal));

    expect(result.current.result).toBe(Number(number1) + Number(number2));
  });

  test('- 연산을 수행할 수 있다.', () => {
    const { result } = renderHook(() => useCalculate());

    act(() => result.current.changeNumber(number1));
    act(() => result.current.calculate(minus));
    act(() => result.current.changeNumber(number2));
    act(() => result.current.calculate(equal));

    expect(result.current.result).toBe(Number(number1) - Number(number2));
  });

  test('X 연산을 수행할 수 있다.', () => {
    const { result } = renderHook(() => useCalculate());

    act(() => result.current.changeNumber(number1));
    act(() => result.current.calculate(mutiplication));
    act(() => result.current.changeNumber(number2));
    act(() => result.current.calculate(equal));

    expect(result.current.result).toBe(Number(number1) * Number(number2));
  });

  test('/ 연산을 수행할 수 있다.', () => {
    const { result } = renderHook(() => useCalculate());

    act(() => result.current.changeNumber(number1));
    act(() => result.current.calculate(division));
    act(() => result.current.changeNumber(number2));
    act(() => result.current.calculate(equal));

    expect(result.current.result).toBe(Number(number1) / Number(number2));
  });
});

describe('기타 기능을 확인한다.', () => {
  test('초기화를 할 수 있다.', () => {
    const { result } = renderHook(() => useCalculate());

    act(() => result.current.changeNumber(number1));
    act(() => result.current.calculate(plus));
    act(() => result.current.changeNumber(number2));
    act(() => result.current.initialize());

    expect(result.current.operations).toEqual({
      prevNumber: 0,
      nextNumber: null,
      operator: '',
    });
  });
});
