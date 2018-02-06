// @flow
import './HeaderCell.css';
import React, { PureComponent, type Node as ReactNode } from 'react';
import classnames from 'classnames';
import SortArrows from '../SortArrows';

type Props = {
  className?: string,
  onClick($PropertyType<Props, 'sortKey'>): void,
  sortBy: ?string,
  sortDirection: 'asc' | 'desc',
  sortKey: string,
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

export default class HeaderCell extends PureComponent<Props> {
  handleClick = () => this.props.onClick(this.props.sortKey);

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    // if they hit space or enter
    if (event.which === 16 || event.which === 32) {
      this.handleClick();
    }
  };

  render() {
    const { className, sortKey, sortBy, sortDirection, title } = this.props;
    const sort = getSort(sortBy, sortDirection, sortKey);

    return (
      <th
        aria-sort={sort}
        className={classnames(className, 'HeaderCell')}
        role="columnheader"
        scope="col"
      >
        <span
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          role="button"
          tabIndex={0}
        >
          {title}
          <SortArrows className="Table-SortArrow" size={10} sorted={sort} />
        </span>
      </th>
    );
  }
}
