import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import studentList from '../../../students';
import { initialState } from '../reducers/entities';
import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  fetchStudents
} from './students';
import { normalizeResponse } from './utils';

const mockStore = configureMockStore([thunk]);
const expectedNormalized = {
  students: {
    byId: {
      student1: { id: 'student1', name: 'Renee Collingwood', grade: 8 },
      student10: { id: 'student10', name: 'Luis Tenney', grade: 7 },
      student16: { id: 'student16', name: 'Armando Depaola', grade: 6 },
      student23: { id: 'student23', name: 'Audry Loudon', grade: 7 },
      student30: { id: 'student30', name: 'Shayne Brunell', grade: 9 },
      student34: { id: 'student34', name: 'Woodrow Broadfoot', grade: 6 }
    }
  },
  classes: {
    byId: {
      class2: {
        name: 'Math',
        id: 'class2',
        students: [
          'student1',
          'student10',
          'student16',
          'student23',
          'student34'
        ]
      },
      class6: {
        name: 'Reading',
        id: 'class6',
        students: [
          'student1',
          'student10',
          'student16',
          'student23',
          'student30',
          'student34'
        ]
      }
    }
  },
  tests: {
    byId: {
      test3: {
        classId: 'class2',
        studentId: 'student1',
        date: '2018-01-01T00:00:00.000Z',
        grade: 90,
        id: 'test3'
      },
      test4: {
        classId: 'class2',
        studentId: 'student1',
        date: '2018-07-01T00:00:00.000Z',
        grade: 45,
        id: 'test4'
      },
      test5: {
        classId: 'class2',
        studentId: 'student1',
        date: '2018-14-01T00:00:00.000Z',
        grade: 75,
        id: 'test5'
      },
      test7: {
        classId: 'class6',
        studentId: 'student1',
        date: '2018-01-01T00:00:00.000Z',
        grade: 89,
        id: 'test7'
      },
      test8: {
        classId: 'class6',
        studentId: 'student1',
        date: '2018-07-01T00:00:00.000Z',
        grade: 76,
        id: 'test8'
      },
      test9: {
        classId: 'class6',
        studentId: 'student1',
        date: '2018-14-01T00:00:00.000Z',
        grade: 90,
        id: 'test9'
      },
      test11: {
        classId: 'class2',
        studentId: 'student10',
        date: '2018-01-01T00:00:00.000Z',
        grade: 100,
        id: 'test11'
      },
      test12: {
        classId: 'class2',
        studentId: 'student10',
        date: '2018-07-01T00:00:00.000Z',
        grade: 95,
        id: 'test12'
      },
      test13: {
        classId: 'class6',
        studentId: 'student10',
        date: '2018-01-01T00:00:00.000Z',
        grade: 89,
        id: 'test13'
      },
      test14: {
        classId: 'class6',
        studentId: 'student10',
        date: '2018-07-01T00:00:00.000Z',
        grade: 76,
        id: 'test14'
      },
      test15: {
        classId: 'class6',
        studentId: 'student10',
        date: '2018-14-01T00:00:00.000Z',
        grade: 90,
        id: 'test15'
      },
      test17: {
        classId: 'class2',
        studentId: 'student16',
        date: '2018-01-01T00:00:00.000Z',
        grade: 81,
        id: 'test17'
      },
      test18: {
        classId: 'class2',
        studentId: 'student16',
        date: '2018-07-01T00:00:00.000Z',
        grade: 54,
        id: 'test18'
      },
      test19: {
        classId: 'class2',
        studentId: 'student16',
        date: '2018-14-01T00:00:00.000Z',
        grade: 73,
        id: 'test19'
      },
      test20: {
        classId: 'class6',
        studentId: 'student16',
        date: '2018-01-01T00:00:00.000Z',
        grade: 89,
        id: 'test20'
      },
      test21: {
        classId: 'class6',
        studentId: 'student16',
        date: '2018-07-01T00:00:00.000Z',
        grade: 76,
        id: 'test21'
      },
      test22: {
        classId: 'class6',
        studentId: 'student16',
        date: '2018-14-01T00:00:00.000Z',
        grade: 90,
        id: 'test22'
      },
      test24: {
        classId: 'class2',
        studentId: 'student23',
        date: '2018-01-01T00:00:00.000Z',
        grade: 89,
        id: 'test24'
      },
      test25: {
        classId: 'class2',
        studentId: 'student23',
        date: '2018-07-01T00:00:00.000Z',
        grade: 76,
        id: 'test25'
      },
      test26: {
        classId: 'class2',
        studentId: 'student23',
        date: '2018-14-01T00:00:00.000Z',
        grade: 90,
        id: 'test26'
      },
      test27: {
        classId: 'class6',
        studentId: 'student23',
        date: '2018-01-01T00:00:00.000Z',
        grade: 89,
        id: 'test27'
      },
      test28: {
        classId: 'class6',
        studentId: 'student23',
        date: '2018-07-01T00:00:00.000Z',
        grade: 76,
        id: 'test28'
      },
      test29: {
        classId: 'class6',
        studentId: 'student23',
        date: '2018-14-01T00:00:00.000Z',
        grade: 90,
        id: 'test29'
      },
      test31: {
        classId: 'class6',
        studentId: 'student30',
        date: '2018-01-01T00:00:00.000Z',
        grade: 54,
        id: 'test31'
      },
      test32: {
        classId: 'class6',
        studentId: 'student30',
        date: '2018-07-01T00:00:00.000Z',
        grade: 66,
        id: 'test32'
      },
      test33: {
        classId: 'class6',
        studentId: 'student30',
        date: '2018-14-01T00:00:00.000Z',
        grade: 81,
        id: 'test33'
      },
      test35: {
        classId: 'class2',
        studentId: 'student34',
        date: '2018-01-01T00:00:00.000Z',
        grade: 81,
        id: 'test35'
      },
      test36: {
        classId: 'class2',
        studentId: 'student34',
        date: '2018-07-01T00:00:00.000Z',
        grade: 68,
        id: 'test36'
      },
      test37: {
        classId: 'class2',
        studentId: 'student34',
        date: '2018-14-01T00:00:00.000Z',
        grade: 55,
        id: 'test37'
      },
      test38: {
        classId: 'class6',
        studentId: 'student34',
        date: '2018-01-01T00:00:00.000Z',
        grade: 89,
        id: 'test38'
      },
      test39: {
        classId: 'class6',
        studentId: 'student34',
        date: '2018-07-01T00:00:00.000Z',
        grade: 76,
        id: 'test39'
      },
      test40: {
        classId: 'class6',
        studentId: 'student34',
        date: '2018-14-01T00:00:00.000Z',
        grade: 90,
        id: 'test40'
      }
    },
    byClassId: {
      class2: [
        'test3',
        'test4',
        'test5',
        'test11',
        'test12',
        'test17',
        'test18',
        'test19',
        'test24',
        'test25',
        'test26',
        'test35',
        'test36',
        'test37'
      ],
      class6: [
        'test7',
        'test8',
        'test9',
        'test13',
        'test14',
        'test15',
        'test20',
        'test21',
        'test22',
        'test27',
        'test28',
        'test29',
        'test31',
        'test32',
        'test33',
        'test38',
        'test39',
        'test40'
      ]
    },
    byStudentId: {
      student1: ['test3', 'test4', 'test5', 'test7', 'test8', 'test9'],
      student10: ['test11', 'test12', 'test13', 'test14', 'test15'],
      student16: ['test17', 'test18', 'test19', 'test20', 'test21', 'test22'],
      student23: ['test24', 'test25', 'test26', 'test27', 'test28', 'test29'],
      student30: ['test31', 'test32', 'test33'],
      student34: ['test35', 'test36', 'test37', 'test38', 'test39', 'test40']
    }
  }
};

describe('actions/students', () => {
  describe('fetchStudents', () => {
    it('fires a request', () => {
      const expectedActions = [
        {
          type: FETCH_STUDENTS_REQUEST
        },
        {
          payload: expectedNormalized,
          type: FETCH_STUDENTS_SUCCESS
        }
      ];

      fetch.mockResponse(JSON.stringify(studentList));

      const store = mockStore({
        entities: initialState
      });

      return store.dispatch(fetchStudents(true)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches failure when there is a failure', () => {
      const error = new Error('fake error message');
      const expectedActions = [
        {
          type: FETCH_STUDENTS_REQUEST
        },
        {
          payload: error,
          type: FETCH_STUDENTS_FAILURE
        }
      ];

      fetch.mockReject(error);

      const store = mockStore({
        entities: initialState
      });

      return store.dispatch(fetchStudents()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
