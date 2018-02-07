// @flow
import styled from 'react-emotion';

const Cell = styled('td')`
  font-weight: 400;
  padding: 0.25rem 0;
  ${({ numeric }) => numeric && 'text-align: right;'};
`;

export default Cell;
