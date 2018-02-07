import { SELECTED_SUBJECT, changeSelectedSubject } from './ui';

describe('actions/ui', () => {
  it('changeSelectedSubject returns the action', () => {
    expect(changeSelectedSubject('mockId')).toMatchObject({
      payload: 'mockId',
      type: SELECTED_SUBJECT
    });
  });
});
