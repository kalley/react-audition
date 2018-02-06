// @flow
import { SELECTED_SUBJECT, type SelectedSubjectAction } from '../actions';

export type State = {
  selectedSubject: ?string
};

const initialState = {
  selectedSubject: null
};

export default function ui(
  state: State = initialState,
  action: SelectedSubjectAction
): State {
  if (action.type === SELECTED_SUBJECT) {
    return {
      selectedSubject: action.payload
    };
  }

  return state;
}
