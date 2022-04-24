import styled from 'styled-components';
import Button from '../Button';

const OperationButton = styled(Button)`
  background-color: orange;

  ${({ pressed }) => pressed && 'filter: brightness(0.9);'};
`;

export default OperationButton;
