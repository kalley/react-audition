// @flow
import './Table.css';
import React, { type Node as ReactNode } from 'react';
import classnames from 'classnames';
import HeaderCell from './HeaderCell';

type Props = {
  headers: Array<{
    key: string,
    rowHeader?: boolean,
    title: ReactNode,
    type?: 'numeric'
  }>,
  onSort(sortKey: string): void,
  rows: Array<Object>,
  sortBy?: ?string,
  sortDirection: 'asc' | 'desc'
};

const getCellClassName = (type: ?'numeric' = null): string =>
  classnames(
    'Table-cell',
    type && {
      [`Table-cell--${type}`]: true
    }
  );

const Table = ({ headers, onSort, rows, sortBy, sortDirection }: Props) => (
  <table aria-readonly="true" className="Table">
    <thead>
      <tr role="row">
        {headers.map(({ key, title, type }) => (
          <HeaderCell
            className={getCellClassName(type)}
            key={key}
            onClick={onSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            sortKey={key}
            title={title}
          />
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={`row-${i}`} role="row">
          {headers.map(({ key, rowHeader, type }) => (
            <td
              className={getCellClassName(type)}
              key={key}
              role={rowHeader ? 'rowheader' : 'gridcell'}
            >
              {row[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
