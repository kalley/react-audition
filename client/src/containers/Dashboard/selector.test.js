import { getClasses } from './selector';

const fixture = {
  classes: {
    byId: {
      class1: {
        id: 'class1',
        name: 'Math',
        students: ['student2', 'student4']
      },
      class2: {
        id: 'class3',
        name: 'Reading',
        students: ['student2', 'student5']
      }
    }
  },
  students: {
    byId: {
      student2: {
        grade: 7,
        id: 'student2',
        name: 'John Smith'
      },
      student4: {
        grade: 6,
        id: 'student4',
        name: 'Joanna Smythe'
      },
      student5: {
        grade: 8,
        id: 'student5',
        name: 'Carl Cook'
      }
    }
  },
  tests: {
    byId: {
      test6: {
        classId: 'class1',
        date: '2018-01-12T22:00:00Z',
        grade: 100,
        id: 'test6',
        studentId: 'student2'
      },
      test7: {
        classId: 'class1',
        date: '2018-01-16T22:00:00Z',
        grade: 100,
        id: 'test7',
        studentId: 'student2'
      },
      test8: {
        classId: 'class1',
        date: '2018-01-23T22:00:00Z',
        grade: 100,
        id: 'test8',
        studentId: 'student2'
      },
      test9: {
        classId: 'class1',
        date: '2018-01-12T22:00:00Z',
        grade: 80,
        id: 'test9',
        studentId: 'student4'
      },
      test10: {
        classId: 'class1',
        date: '2018-01-12T22:00:00Z',
        grade: 90,
        id: 'test10',
        studentId: 'student4'
      },
      test11: {
        classId: 'class1',
        date: '2018-01-12T22:00:00Z',
        grade: 90,
        id: 'test11',
        studentId: 'student4'
      },
      test12: {
        classId: 'class2',
        date: '2018-01-12T22:00:00Z',
        grade: 9,
        id: 'test12',
        studentId: 'student5'
      },
      test13: {
        classId: 'class2',
        date: '2018-01-12T22:00:00Z',
        grade: 5,
        id: 'test13',
        studentId: 'student5'
      },
      test14: {
        classId: 'class2',
        date: '2018-01-12T22:00:00Z',
        grade: 0,
        id: 'test14',
        studentId: 'student5'
      },
      test15: {
        classId: 'class2',
        date: '2018-01-23T22:00:00Z',
        grade: 168,
        id: 'test15',
        studentId: 'student2'
      },
      test16: {
        classId: 'class2',
        date: '2018-01-23T22:00:00Z',
        grade: 80,
        id: 'test16',
        studentId: 'student2'
      }
    },
    byClassId: {
      class1: ['test6', 'test7', 'test8', 'test9', 'test10', 'test11'],
      class3: ['test12', 'test13', 'test14', 'test15', 'test16']
    },
    byStudentId: {
      student2: ['test6', 'test7', 'test8', 'test15', 'test16'],
      student4: ['test9', 'test10', 'test11'],
      student5: ['test12', 'test13', 'test14']
    }
  }
};

describe('Dashboard/selector', () => {
  it('returns the correct information', () => {
    expect(getClasses({ entities: fixture })).toMatchObject([
      {
        id: 'class1',
        name: 'Math',
        students: [
          {
            avgGrade: 100,
            avgGradeText: '100%',
            name: 'John Smith',
            id: 'student2'
          },
          {
            avgGrade: 86.66666666666667,
            avgGradeText: '87%',
            name: 'Joanna Smythe',
            id: 'student4'
          }
        ]
      },
      {
        id: 'class3',
        name: 'Reading',
        students: [
          {
            avgGrade: 124,
            avgGradeText: '124%',
            name: 'John Smith',
            id: 'student2'
          },
          {
            avgGrade: 4.666666666666667,
            avgGradeText: '5%',
            name: 'Carl Cook',
            id: 'student5'
          }
        ]
      }
    ]);
  });
});
