// @flow
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

const get = (obj: ?{ [string]: * }, prop: string): string =>
  (obj && obj[prop].toString()) || '';

export default class ClassCard extends Component<Props, State> {
  // constructor is necessary to pass handleClick in without arbitrarily moving it above
  // setting state as a class property...
  constructor(props: Props) {
    super(props);

    this.state = {
      sortBy: null,
      sortDirection: 'asc'
    };
  }

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

      clearTimeout(this.textTimer);
      screenReaderText.setText(
        `(Sorted by ${get(
          headers.find(({ key }) => key === sortBy),
          'title'
        )}: ${sortDirection})`
      );
      this.textTimer = setTimeout(() => screenReaderText.setText(''), 2000);
    }
  };

  textTimer: ?number;

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
      ? subject.students.sort(
          (a, b) =>
            a[sortBy].localeCompare(b[sortBy]) *
            (sortDirection === 'asc' ? 1 : -1)
        )
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
