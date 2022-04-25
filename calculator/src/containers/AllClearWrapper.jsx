import React from 'react'
import AllClearComponent from '../components/AllClearComponent';

const AllClearWrapper = ({ setCalculateInfo }) => {
  const handleAllClear = () => {
    setCalculateInfo({
      firstNumber: 0,
      operation: "",
      secondNumber: "",
    });
  };

  return (
    <>
      <AllClearComponent 
        handleAllClear={handleAllClear}
      />
    </>
  )
}

export default AllClearWrapper