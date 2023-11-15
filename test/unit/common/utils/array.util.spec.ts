import { isItemEmail } from '../../../../src/common/utils/array.util';

describe('isItemEmail', () => {
  it('should return false', async () => {
    const items = ['teacherken@gmail.com', 'not-an-email'];
    expect(items.every(isItemEmail)).toBe(false);
  });

  it('should return true', async () => {
    const items = ['teacherken@gmail.com', 'teacherpeter@gmail.com'];
    expect(items.every(isItemEmail)).toBe(true);
  });
});
