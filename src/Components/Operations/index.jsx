import PropTypes from 'prop-types';
import { OPERATION_LIST } from '../../Constants';

import Container from './styles';

function OperationButton({ currentOperator, onClickOperation, onClickResult }) {
  return (
    <div className="operations subgrid">
      {OPERATION_LIST.map((operation, index) => (
        <Container
          type="button"
          // 연산자 목록이 이후 변경될 일이 없음으로 key를 index로 사용
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="operation"
          pressed={currentOperator === operation}
          onClick={() => onClickOperation(operation)}
        >
          {operation}
        </Container>
      ))}

      <Container type="submit" className="operation" onClick={onClickResult}>
        =
      </Container>
    </div>
  );
}

OperationButton.defaultProps = {
  currentOperator: '',
};

OperationButton.propTypes = {
  currentOperator: PropTypes.string,
  onClickOperation: PropTypes.func.isRequired,
  onClickResult: PropTypes.func.isRequired,
};

export default OperationButton;
