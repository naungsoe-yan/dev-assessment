import { Logger, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isEmpty } from 'class-validator';

export const contentTypeMiddleware = () => {
  const logger = new Logger(contentTypeMiddleware.name);
  const JSON_CONTENT_TYPE = 'application/json';
  const isJsonContentType = (contentType: string): boolean => {
    return contentType.toLocaleLowerCase() === JSON_CONTENT_TYPE;
  };

  return (request: Request, response: Response, next: NextFunction) => {
    if (request.method === 'POST') {
      const contentType = request.headers['content-type'];
      const body = JSON.stringify(request.body);
      logger.log(
        `Received {${request.url}, ${request.method}, ${body}} request`,
      );

      if (isEmpty(contentType) || !isJsonContentType(contentType)) {
        logger.log(`Thrown {${request.url}, ${request.method}, 'Bad Request'}`);
        throw new BadRequestException(
          `content-type must be ${JSON_CONTENT_TYPE}`,
        );
      }
    }
    next();
  };
};
