// @flow
import './ClassCard.css';
import React, { Component, type ElementProps } from 'react';
import Card from '../Card';
import Table from '../Table';

type Props = {
  isSelected: boolean,
  onClick(classId: ?string): void,
  subject: {
    id: string,
    name: string,
    students: Array<{
      avgGrade: string,
      name: string
    }>
  }
};

type State = {
  sortBy: ?('name' | 'avgGrade'),
  sortDirection: 'asc' | 'desc',
  titleComponent: $ElementType<ElementProps<typeof Card>, 'titleComponent'>
};

const titleFactory: (
  onClick: () => void
) => $ElementType<State, 'titleComponent'> = onClick =>
  function Title({ children, className }) {
    return (
      <h2 className="ClassCard-title">
        <button
          className={`${className} ClassCard-title__button`}
          onClick={onClick}
        >
          {children}
        </button>
      </h2>
    );
  };

export default class ClassCard extends Component<Props, State> {
  // constructor is necessary to pass handleClick in without arbitrarily moving it above
  // setting state as a class property...
  constructor(props: Props) {
    super(props);

    this.state = {
      sortBy: null,
      sortDirection: 'asc',
      titleComponent: titleFactory(this.handleClick)
    };
  }

  handleClick = () => {
    const { isSelected, onClick, subject } = this.props;

    onClick(isSelected ? null : subject.id);
  };

  handleSort = (sortBy: string) => {
    const { sortBy: prevSortBy, sortDirection: prevSortDirection } = this.state;

    this.setState({
      sortBy: ((sortBy: any): 'name' | 'avgGrade'),
      sortDirection:
        sortBy === prevSortBy && prevSortDirection === 'asc' ? 'desc' : 'asc'
    });
  };

  renderStudentTable() {
    const { sortBy, sortDirection } = this.state;
    const { subject } = this.props;
    const rows = sortBy
      ? subject.students.sort(
          (a, b) =>
            a[sortBy].localeCompare(b[sortBy]) *
            (sortDirection === 'asc' ? 1 : -1)
        )
      : subject.students;

    return (
      <Table
        headers={[
          {
            key: 'name',
            rowHeader: true,
            title: 'Student Name'
          },
          {
            key: 'avgGrade',
            title: 'Average Grade',
            type: 'numeric'
          }
        ]}
        onSort={this.handleSort}
        rows={rows}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    );
  }

  render() {
    const { isSelected, subject } = this.props;

    return (
      <Card title={subject.name} titleComponent={this.state.titleComponent}>
        {isSelected && this.renderStudentTable()}
      </Card>
    );
  }
}
