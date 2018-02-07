import { SELECTED_SUBJECT } from '../actions/ui';
import ui, { initialState } from './ui';

describe('reducers/ui', () => {
  it('should return the initial state', () => {
    expect(ui(undefined, {})).toEqual(initialState);
  });

  it('should handle SELECTED_SUBJECT', () => {
    expect(
      ui(undefined, {
        payload: 'mockId',
        type: SELECTED_SUBJECT
      })
    ).toEqual({
      selectedSubject: 'mockId'
    });
  });
});
