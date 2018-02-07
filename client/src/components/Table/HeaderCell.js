// @flow
import React, { PureComponent, type Node as ReactNode } from 'react';
import styled from 'react-emotion';
import SortArrows from '../SortArrows';
import BaseCell from './Cell';

type Props = {
  numeric: boolean,
  onClick(string): void,
  sortBy: ?string,
  sortDirection: 'asc' | 'desc',
  sortKey?: string,
  title: ReactNode
};

const getSort = (
  sortBy: ?string,
  sortDirection: 'asc' | 'desc',
  sortKey: string
): 'none' | 'ascending' | 'descending' => {
  if (!sortBy || sortBy !== sortKey) {
    return 'none';
  }

  return sortDirection === 'asc' ? 'ascending' : 'descending';
};

const Cell = styled(BaseCell.withComponent('th'))`
  font-size: 1.1rem;
`;

const Sortable = styled('span')`
  cursor: pointer;
  position: relative;

  &::after {
    border-top: 1px solid #309bf8;
    bottom: 1px;
    content: '';
    left: 0;
    opacity: 0.25;
    position: absolute;
    right: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:active,
  &:focus,
  &:hover {
    outline: 0;

    &::after {
      opacity: 0.75;
    }
  }
`;

export default class HeaderCell extends PureComponent<Props> {
  handleClick = () =>
    this.props.sortKey && this.props.onClick(this.props.sortKey);

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    // if they hit space or enter
    if (event.which === 16 || event.which === 32) {
      this.handleClick();
    }
  };

  render() {
    const { numeric, sortKey, sortBy, sortDirection, title } = this.props;
    const sort = sortKey ? getSort(sortBy, sortDirection, sortKey) : undefined;

    return (
      <Cell aria-sort={sort} numeric={numeric} role="columnheader" scope="col">
        {sort ? (
          <Sortable
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            role="button"
            tabIndex={0}
          >
            {title}
            <SortArrows className="Table-SortArrow" size={10} sorted={sort} />
          </Sortable>
        ) : (
          title
        )}
      </Cell>
    );
  }
}
