// @flow
import { map } from 'lodash';
import React, { type Node as ReactNode } from 'react';
import styled from 'react-emotion';
import Cell from './Cell';
import HeaderCell from './HeaderCell';

type Props = {
  headers: Array<{
    key: string,
    rowHeader?: boolean,
    sortKey?: string,
    title: ReactNode,
    type?: 'numeric'
  }>,
  onSort(sortKey: string): void,
  rows: Array<Object>,
  sortBy?: ?string,
  sortDirection: 'asc' | 'desc'
};

const Container = styled('table')`
  text-align: left;
  width: 100%;
`;

const Table = ({ headers, onSort, rows, sortBy, sortDirection }: Props) => (
  <Container aria-readonly="true">
    <thead>
      <tr role="row">
        {map(headers, ({ key, sortKey, title, type }) => (
          <HeaderCell
            key={key}
            numeric={type === 'numeric'}
            onClick={onSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            sortKey={sortKey || key}
            title={title}
          />
        ))}
      </tr>
    </thead>
    <tbody>
      {map(rows, (row, i) => (
        <tr key={`row-${i}`} role="row">
          {map(headers, ({ key, rowHeader, type }) => (
            <Cell
              key={key}
              numeric={type === 'numeric'}
              role={rowHeader ? 'rowheader' : 'gridcell'}
            >
              {row[key]}
            </Cell>
          ))}
        </tr>
      ))}
    </tbody>
  </Container>
);

export default Table;
