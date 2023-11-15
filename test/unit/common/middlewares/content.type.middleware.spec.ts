import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createMock } from '@golevelup/ts-jest';
import {
  Middleware,
  contentTypeMiddleware,
} from '../../../../src/common/middlewares/content.type.middleware';
import { IncomingHttpHeaders } from 'http';

describe('contentTypeMiddleware', () => {
  let request: Request;
  let response: Response;
  let nextFn: NextFunction;
  let logger: Logger;
  let middlewareFn: Middleware;

  beforeEach(async () => {
    request = createMock<Request>({
      get method() {
        return this._method;
      },
      get headers() {
        return this._heaers;
      },
    });
    response = createMock<Response>();
    nextFn = jest.fn();
    logger = createMock<Logger>();
    middlewareFn = contentTypeMiddleware(logger);
  });

  describe('intercept', () => {
    it('should not intercept and accept request', async () => {
      jest.spyOn(request, 'method', 'get').mockReturnValue('GET');
      jest.spyOn(logger, 'log').mockImplementation((message) => message);
      middlewareFn(request, response, nextFn);
      expect(logger.log).not.toHaveBeenCalled();
      expect(nextFn).toHaveBeenCalled();
    });

    it('should intercept and reject request', async () => {
      jest.spyOn(request, 'method', 'get').mockReturnValue('POST');
      jest.spyOn(request, 'headers', 'get').mockReturnValue(
        createMock<IncomingHttpHeaders>({
          'content-type': 'unknown',
        }),
      );
      jest.spyOn(logger, 'log').mockImplementation((message) => message);
      middlewareFn(request, response, nextFn);
      expect(logger.log).toHaveBeenCalledTimes(2);
      expect(nextFn).toHaveBeenCalled();
    });

    it('should intercept and accept request', async () => {
      jest.spyOn(request, 'method', 'get').mockReturnValue('POST');
      jest.spyOn(request, 'headers', 'get').mockReturnValue(
        createMock<IncomingHttpHeaders>({
          'content-type': 'application/json',
        }),
      );
      jest.spyOn(logger, 'log').mockImplementation((message) => message);
      middlewareFn(request, response, nextFn);
      expect(logger.log).toHaveBeenCalledTimes(1);
      expect(nextFn).toHaveBeenCalled();
    });
  });
});
