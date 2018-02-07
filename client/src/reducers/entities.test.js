import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE
} from '../actions/students';
import entities, { initialState } from './entities';

describe('reducers/entities', () => {
  it('should return the initial state', () => {
    expect(entities(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_STUDENTS_REQUEST', () => {
    expect(
      entities(initialState, {
        type: FETCH_STUDENTS_REQUEST
      })
    ).toMatchObject({
      fetching: true
    });
  });

  it('should handle FETCH_STUDENTS_SUCCESS', () => {
    expect(
      entities(
        {
          ...initialState,
          fetching: true
        },
        {
          payload: {
            students: {
              byId: {
                student1: {
                  grade: 8,
                  name: 'Test Student'
                }
              }
            }
          },
          type: FETCH_STUDENTS_SUCCESS
        }
      )
    ).toMatchObject({
      fetching: false,
      students: {
        byId: {
          student1: {
            grade: 8,
            name: 'Test Student'
          }
        }
      }
    });
  });

  it('should handle FETCH_STUDENTS_FAILURE', () => {
    const error = new Error('Fake error');

    expect(
      entities(
        {
          ...initialState,
          fetching: true
        },
        {
          payload: error,
          type: FETCH_STUDENTS_FAILURE
        }
      )
    ).toMatchObject({
      error,
      fetching: false
    });
  });
});
