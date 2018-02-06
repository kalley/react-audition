// @flow
let counter = 1;
const uniqueId = (prefix: string = '') => `${prefix}_${counter++}`;

export type Response = Array<{|
  name: string,
  grade: number,
  classes: Array<{|
    name: string,
    tests: Array<{|
      date: string,
      grade: number
    |}>
  |}>
|}>;

export type NormalizedStudent = {|
  grade: number,
  id: string,
  name: string
|};

export type NormalizedClass = {|
  id: string,
  name: string,
  students: Array<$ElementType<NormalizedStudent, 'id'>>
|};

export type NormalizedTest = {|
  classId: $ElementType<NormalizedClass, 'id'>,
  date: string,
  grade: number,
  id: string,
  studentId: $ElementType<NormalizedStudent, 'id'>
|};

export type NormalizedData = {|
  students: {
    byId: {
      [string]: NormalizedStudent
    }
  },
  classes: {
    byId: {
      [string]: NormalizedClass
    }
  },
  tests: {
    byId: {
      [string]: NormalizedTest
    },
    byClassId: {
      [string]: Array<$ElementType<NormalizedClass, 'id'>>
    },
    byStudentId: {
      [string]: Array<$ElementType<NormalizedStudent, 'id'>>
    }
  }
|};

export const normalizeResponse = (response: Response): NormalizedData => {
  const classNameIdMap: { [string]: string } = {};
  const normalizedData = response.reduce(
    ({ students, classes, tests }: NormalizedData, student) => {
      const studentId = uniqueId('student');

      students.byId[studentId] = {
        id: studentId,
        name: student.name,
        grade: student.grade
      };

      student.classes.forEach(({ name, tests: classTests }) => {
        let classId = classNameIdMap[name];

        if (!classId) {
          classId = uniqueId('class');
          classNameIdMap[name] = classId;

          classes.byId[classId] = {
            name,
            id: classId,
            students: []
          };
        }

        classes.byId[classId].students.push(studentId);

        classTests.forEach(test => {
          const testId = uniqueId('test');

          tests.byId[testId] = {
            classId,
            studentId,
            date: test.date,
            grade: test.grade,
            id: testId
          };

          if (!tests.byClassId[classId]) {
            tests.byClassId[classId] = [];
          }

          tests.byClassId[classId].push(testId);

          if (!tests.byStudentId[studentId]) {
            tests.byStudentId[studentId] = [];
          }

          tests.byStudentId[studentId].push(testId);
        });
      });

      return { students, classes, tests };
    },
    {
      students: {
        byId: {}
      },
      classes: {
        byId: {}
      },
      tests: {
        byId: {},
        byClassId: {},
        byStudentId: {}
      }
    }
  );

  return normalizedData;
};
