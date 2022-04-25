import React, { useState, useEffect, useCallback } from 'react';
import ClearButton from './components/ClearButton';
import Digits from './components/Digits';
import Operators from './components/Operators';
import Screen from './components/Screen';
import { isOverMaxLength } from './validator';

export default function Calculator() {
  const [screenNumber, setScreenNumber] = useState(0);
  const [recordNumber, setRecordNumber] = useState(0);
  const [isNumberStep, setIsNumberStep] = useState(true);

  const handleBeforeUnload = useCallback((e) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);

  const addBeforeUnloadEvent = useCallback(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
  }, [handleBeforeUnload]);

  const removeBeforeUnloadEvent = useCallback(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [handleBeforeUnload]);

  const onClickDigit = (enteredDigit) => {
    if (!isNumberStep) {
      setScreenNumber(enteredDigit);
      setIsNumberStep(true);
      return;
    }
    const prevNumber = screenNumber;
    if (!isOverMaxLength(prevNumber)) {
      setScreenNumber(prevNumber * 10 + enteredDigit);
    }
  };

  useEffect(() => {
    const storedNumber = Number(localStorage.getItem('calculator-data'));
    setScreenNumber(storedNumber);
  }, []);

  useEffect(() => {
    if (screenNumber === 0) {
      localStorage.setItem('calculator-data', JSON.stringify(0));
      removeBeforeUnloadEvent();
      return;
    }
    localStorage.setItem('calculator-data', JSON.stringify(screenNumber));
    addBeforeUnloadEvent();
  }, [screenNumber, addBeforeUnloadEvent, removeBeforeUnloadEvent]);

  return (
    <div className="calculator">
      <Screen screenNumber={screenNumber}></Screen>
      <Digits onClickDigit={onClickDigit}></Digits>
      <Operators
        setScreenNumber={setScreenNumber}
        screenNumber={screenNumber}
        setStep={setIsNumberStep}
        isNumberStep={isNumberStep}
        recordNumber={recordNumber}
        setRecordNumber={setRecordNumber}
      ></Operators>
      <ClearButton
        setScreenNumber={setScreenNumber}
        setRecordNumber={setRecordNumber}
      ></ClearButton>
    </div>
  );
}
