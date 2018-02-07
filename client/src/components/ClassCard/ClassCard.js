// @flow
import { get, orderBy } from 'lodash';
import React, { Component, Fragment, type ElementRef, type Ref } from 'react';
import styled from 'react-emotion';
import Card, { Title, type RenderTitle } from '../Card';
import Caret from '../Caret';
import Table from '../Table';
import ScreenReaderText from '../ScreenReaderText';

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
  sortDirection: 'asc' | 'desc'
};

const headers = [
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
];

const TitleWrap = styled('h2')`
  margin: 0;
`;

const TitleButton = styled(Title.withComponent('button'))`
  width: 100%;

  &:active,
  &:focus {
    outline: 0;
    text-decoration: underline;
  }
`;

const TitleCaret = styled(Caret)`
  ${({ open }: { open: boolean }) => open && `transform: rotate(180deg);`};
`;

export default class ClassCard extends Component<Props, State> {
  state = {
    sortBy: null,
    sortDirection: 'asc'
  };

  handleClick = () => {
    const { isSelected, onClick, subject } = this.props;

    onClick(isSelected ? null : subject.id);
  };

  handleSort = (sortBy: string) => {
    const { sortBy: prevSortBy, sortDirection: prevSortDirection } = this.state;
    const sortDirection =
      sortBy === prevSortBy && prevSortDirection === 'asc' ? 'desc' : 'asc';

    this.setState({
      sortDirection,
      sortBy: ((sortBy: any): 'name' | 'avgGrade')
    });

    if (this.screenReaderText) {
      const { screenReaderText } = this;

      screenReaderText.setText(
        `(Sorted by ${get(
          headers.find(({ key }) => key === sortBy),
          'title'
        )}: ${sortDirection})`
      );
    }
  };

  screenReaderText: ?ElementRef<typeof ScreenReaderText>;

  setScreenReaderTextRef: Ref<typeof ScreenReaderText> = screenReaderText => {
    this.screenReaderText = screenReaderText;
  };

  renderTitle: RenderTitle = ({ title }) => (
    <TitleWrap>
      <TitleButton onClick={this.handleClick}>
        {title}
        <TitleCaret open={this.props.isSelected} size={10} />
      </TitleButton>
    </TitleWrap>
  );

  renderStudentTable() {
    const { sortBy, sortDirection } = this.state;
    const { subject } = this.props;
    const rows = sortBy
      ? orderBy(subject.students, [sortBy], [sortDirection])
      : subject.students;

    return (
      <Fragment>
        <Table
          headers={headers}
          onSort={this.handleSort}
          rows={rows}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
        <ScreenReaderText ref={this.setScreenReaderTextRef} />
      </Fragment>
    );
  }

  render() {
    const { isSelected, subject } = this.props;

    return (
      <Card renderTitle={this.renderTitle} title={subject.name}>
        {isSelected && this.renderStudentTable()}
      </Card>
    );
  }
}
