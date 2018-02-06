// @flow
import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  type RequestAction,
  type SuccessAction,
  type FailureAction,
  type NormalizedData
} from '../actions/students';

export type State = {
  ...NormalizedData,
  error?: Error,
  fetching: boolean
};

const initialState: State = {
  fetching: false,
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
};

export default function entities(
  state: State = initialState,
  action: RequestAction | SuccessAction | FailureAction
): State {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return {
        ...initialState,
        fetching: true
      };
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...action.payload,
        fetching: false
      };
    case FETCH_STUDENTS_FAILURE:
      console.warn(action.payload.stack);

      return {
        ...state,
        error: action.payload,
        fetching: false
      };
    default:
      // eslint-disable-next-line no-unused-expressions
      (action: empty);

      return state;
  }
}
