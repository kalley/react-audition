// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { changeSelectedSubject, fetchStudents } from '../../actions';
import type { ReduxState } from '../../reducers';
import ClassCard from '../../components/ClassCard';
import { getClasses } from './selector';

type Props = {
  isLoading: boolean,
  onMount(): void,
  onSubjectClick(classId: ?string): void,
  selectedSubject: ?string,
  subjects: Array<{
    id: string,
    name: string,
    students: Array<{
      avgGrade: string,
      name: string
    }>
  }>
};

export class Dashboard extends PureComponent<Props> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { isLoading, onSubjectClick, selectedSubject, subjects } = this.props;

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        {subjects.map(subject => (
          <ClassCard
            isSelected={subject.id === selectedSubject}
            key={subject.id}
            onClick={onSubjectClick}
            subject={subject}
          />
        ))}
      </div>
    );
  }
}

export default connect(
  ({ entities, ui: { selectedSubject } }: ReduxState) => ({
    selectedSubject,
    isLoading: entities.fetching,
    subjects: getClasses({ entities })
  }),
  {
    onMount: fetchStudents,
    onSubjectClick: changeSelectedSubject
  }
)(Dashboard);
