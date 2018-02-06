// @flow
import './Card.css';
import React, { type ComponentType, type Node } from 'react';
import classnames from 'classnames';
import Caret from '../Caret';

type Props = {
  children?: Node,
  title: Node,
  titleComponent: ComponentType<{ children: Node, className: string }>
};

const Card = ({ children, title, titleComponent: Title }: Props) => (
  <div
    className={classnames('Card', {
      'Card--collapsed': !children
    })}
  >
    <Title className="Card-title">
      {title}
      <Caret className="Card-Caret" size={10} />
    </Title>
    {children && <div className="Card-body">{children}</div>}
  </div>
);

Card.defaultProps = {
  titleComponent: 'h2'
};

export default Card;
