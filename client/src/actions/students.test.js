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

describe('actions/students', () => {
  describe('fetchStudents', () => {
    it('fires a request', () => {
      const expectedActions = [
        {
          type: FETCH_STUDENTS_REQUEST
        },
        {
          payload: normalizeResponse(studentList, true),
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
