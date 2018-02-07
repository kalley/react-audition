// @flow
import type { Dispatch } from 'redux';
import { normalizeResponse, type NormalizedData, type Response } from './utils';

export const FETCH_STUDENTS_REQUEST = 'FETCH_STUDENTS_REQUEST';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

export type { NormalizedData };

export type RequestAction = {
  type: 'FETCH_STUDENTS_REQUEST'
};

export type SuccessAction = {
  payload: NormalizedData,
  type: 'FETCH_STUDENTS_SUCCESS'
};

export type FailureAction = {
  payload: Error,
  type: 'FETCH_STUDENTS_FAILURE'
};

export type Actions = RequestAction | SuccessAction | FailureAction;

export const fetchStudents = () => async (dispatch: Dispatch<Actions>) => {
  dispatch({ type: FETCH_STUDENTS_REQUEST });

  try {
    const response = await fetch('/api/students');

    if (response.ok) {
      const json: Response = await response.json();

      dispatch({
        payload: normalizeResponse(json),
        type: FETCH_STUDENTS_SUCCESS
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_FAILURE,
      payload: error
    });
  }
};
