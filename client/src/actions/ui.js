// @flow
export const SELECTED_SUBJECT = 'SELECTED_SUBJECT';

export type SelectedSubjectAction = {
  payload: ?string,
  type: 'SELECTED_SUBJECT'
};

export const changeSelectedSubject = (
  classId: ?string = null
): SelectedSubjectAction => ({
  payload: classId,
  type: SELECTED_SUBJECT
});
