import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeInterceptor implements NestInterceptor {
  private readonly JSON_CONTENT_TYPE = 'application/json';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.method === 'POST') {
      const contentType = request.headers['content-type'];

      if (isEmpty(contentType) || !this.isJsonContentType(contentType)) {
        throw new BadRequestException(
          `content-type must be ${this.JSON_CONTENT_TYPE}`,
        );
      }
    }

    return next.handle();
  }

  private isJsonContentType(contentType: string): boolean {
    return contentType.toLocaleLowerCase() === this.JSON_CONTENT_TYPE;
  }
}
