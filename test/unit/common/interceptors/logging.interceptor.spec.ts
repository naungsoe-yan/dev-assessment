import { ExecutionContext, CallHandler } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { Observable } from 'rxjs';
import { LoggingInterceptor } from '../../../../src/common/interceptors/logging.interceptor';

describe('LoggingInterceptor', () => {
  let context: ExecutionContext;
  let callHander: CallHandler;
  let loggingInterceptor: LoggingInterceptor;

  beforeEach(async () => {
    context = createMock<ExecutionContext>();
    callHander = createMock<CallHandler>();
    loggingInterceptor = new LoggingInterceptor();
  });

  describe('intercept', () => {
    it('should log web request and pass to next', async () => {
      jest
        .spyOn(callHander, 'handle')
        .mockImplementation(() => createMock<Observable<any>>());
      loggingInterceptor.intercept(context, callHander);
      expect(callHander.handle).toHaveBeenCalled();
    });
  });
});
