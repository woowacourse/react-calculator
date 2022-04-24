import PropTypes from 'prop-types';

const OPERATION_LIST = ['/', 'X', '-', '+'];

function OperationButton({ onClickOperation, onClickResult }) {
  return (
    <div className="operations subgrid">
      {OPERATION_LIST.map((operation, index) => (
        <button
          type="button"
          // 연산자 목록이 이후 변경될 일이 없음으로 key를 index로 사용
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="operation"
          onClick={() => onClickOperation(operation)}
        >
          {operation}
        </button>
      ))}
      <button type="submit" className="operation" onClick={onClickResult}>
        =
      </button>
    </div>
  );
}

OperationButton.propTypes = {
  onClickOperation: PropTypes.func.isRequired,
  onClickResult: PropTypes.func.isRequired,
};

export default OperationButton;
