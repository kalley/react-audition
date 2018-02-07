import studentList from '../../../students';
import { normalizeResponse } from './utils';

describe('actions/utils', () => {
  describe('normalizeResponse', () => {
    it('normalizes the response', () => {
      const normalized = normalizeResponse(studentList);

      expect(normalized).toMatchObject({
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
      });
    });
  });
});
