const AllClearComponent = ({ handleAllClear }) => {
  return (
    <>
      <div className="modifiers subgrid">
        <button className="modifier" onClick={handleAllClear}>
          AC
        </button>
      </div>
    </>
  )
}

export default AllClearComponent
