import { OPERATIONS } from '../constants';

export default function OperatorButtons({ updateOperation }) {
  return (
    <div className="operations subgrid">
      {OPERATIONS.map((operation, index) => (
        <button
          className="operation"
          value={operation}
          key={index}
          onClick={() => {
            updateOperation(operation);
          }}
        >
          {operation.toLocaleUpperCase()}
        </button>
      ))}
    </div>
  );
}
