import {
  BadRequestException,
  ExecutionContext,
  HttpServer,
} from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { GlobalExceptionFilter } from '../../../../src/common/filters/global.exception.filter';

describe('GlobalExceptionFilter', () => {
  let context: ExecutionContext;
  let httpServer: HttpServer;
  let exceptionFilter: GlobalExceptionFilter;

  beforeEach(async () => {
    context = createMock<ExecutionContext>();
    httpServer = createMock<HttpServer>();
    exceptionFilter = new GlobalExceptionFilter(httpServer);
  });

  describe('catch', () => {
    it('should handle a known exception', async () => {
      const exception = new BadRequestException('Known exception');
      jest
        .spyOn(exceptionFilter, 'handleUnknownError')
        .mockImplementation(() => {});
      exceptionFilter.catch(exception, context);
      expect(exceptionFilter.handleUnknownError).not.toHaveBeenCalled();
    });

    it('should handle a unknown exception', async () => {
      const exception = new Error('Unknown exception');
      jest
        .spyOn(exceptionFilter, 'handleUnknownError')
        .mockImplementation(() => {});
      exceptionFilter.catch(exception, context);
      expect(exceptionFilter.handleUnknownError).toHaveBeenCalled();
    });
  });
});
