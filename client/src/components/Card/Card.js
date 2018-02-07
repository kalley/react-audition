// @flow
import React, {
  type Element as ReactElement,
  type Node as ReactNode
} from 'react';
import styled from 'react-emotion';

export type RenderTitle = ({ title: ReactNode }) => ReactElement<*>;

type Props = {
  children?: ReactNode,
  renderTitle: RenderTitle,
  title: ReactNode
};

const Container = styled('div')`
  border: 1px solid #309bf8;
  color: #309bf8;
  margin-bottom: 1.25rem;
  max-width: 725px;
`;

export const Title = styled('h2')`
  align-items: center;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  font-weight: 400;
  justify-content: space-between;
  margin: 0;
  padding: 2rem 2rem 2rem 3rem;
`;

const Body = styled('div')`
  padding: 0 2rem 2rem 3rem;
`;

const Card = ({ children, renderTitle, title }: Props) => (
  <Container>
    {renderTitle({ title })}
    {children && <Body>{children}</Body>}
  </Container>
);

Card.defaultProps = {
  renderTitle: ({ title }) => <Title>{title}</Title>
};

export default Card;
