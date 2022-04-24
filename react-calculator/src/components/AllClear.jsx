function AllClear({ allClear }) {
  const handleAllClearButtonClick = () => {
    allClear();
  };

  return (
    <div className="allClear subgrid">
      <button className="allClearButton" onClick={handleAllClearButtonClick}>
        AC
      </button>
    </div>
  );
}

export default AllClear;
