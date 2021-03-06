// @flow
import { map, reduce } from 'lodash';
import { createSelector } from 'reselect';
import type { ReduxState } from '../../reducers';

type ReleventState = { entities: $ElementType<ReduxState, 'entities'> };

const selectClasses = (state: ReleventState) => state.entities.classes;
const selectStudents = (state: ReleventState) => state.entities.students;
const selectTests = (state: ReleventState) => state.entities.tests;

const calculateClassAverage = (
  studentId: string,
  classId: string,
  tests: $ElementType<$ElementType<ReduxState, 'entities'>, 'tests'>
) => {
  const { length, sum } = reduce(
    tests.byId,
    (memo, test, testId) => {
      if (
        !tests.byClassId[classId].includes(testId) ||
        !tests.byStudentId[studentId].includes(testId)
      ) {
        return memo;
      }

      return {
        length: memo.length + 1,
        sum: memo.sum + test.grade
      };
    },
    {
      length: 0,
      sum: 0
    }
  );

  return sum / length;
};

export const getClasses = createSelector(
  selectClasses,
  selectStudents,
  selectTests,
  (classes, students, tests) =>
    map(classes.byId, subject => {
      return {
        id: subject.id,
        name: subject.name,
        students: map(subject.students, studentId => {
          const { name } = students.byId[studentId];
          // coercing to string to make the sort function reusable
          const avgGrade = `${Math.round(
            calculateClassAverage(studentId, subject.id, tests)
          )}%`;

          return {
            avgGrade,
            name,
            id: studentId
          };
        })
      };
    })
);
