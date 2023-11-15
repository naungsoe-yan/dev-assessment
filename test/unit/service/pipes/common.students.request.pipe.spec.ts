import { BadRequestException } from '@nestjs/common';
import { ParseCommonStudentsRequestPipe } from '../../../../src/service/pipes/common.students.request.pipe';

describe('ParseCommonStudentsRequestPipe', () => {
  let requestPipe: ParseCommonStudentsRequestPipe;

  beforeEach(async () => {
    requestPipe = new ParseCommonStudentsRequestPipe();
  });

  describe('transform', () => {
    it('should throw exception if value is empty', async () => {
      expect(() => requestPipe.transform(null)).toThrow(BadRequestException);
    });

    it('should throw exception if value is an empty array', async () => {
      expect(() => requestPipe.transform([])).toThrow(BadRequestException);
    });

    it('should throw exception if value in array is not an email', async () => {
      expect(() => requestPipe.transform(['not-an-emal'])).toThrow(
        BadRequestException,
      );
    });

    it('should throw exception if value is not an email', async () => {
      expect(() => requestPipe.transform('not-an-emal')).toThrow(
        BadRequestException,
      );
    });

    it('should return request model with a teacher', async () => {
      const teacherEmail = 'teacherken@gmail.com';
      const result = requestPipe.transform(teacherEmail);
      expect(result.teachers).toStrictEqual([teacherEmail]);
    });

    it('should return request model with teachers', async () => {
      const teacherEmails = ['teacherken@gmail.com', 'teacherpeter@gmail.com'];
      const result = requestPipe.transform(teacherEmails);
      expect(result.teachers).toStrictEqual(teacherEmails);
    });
  });
});
