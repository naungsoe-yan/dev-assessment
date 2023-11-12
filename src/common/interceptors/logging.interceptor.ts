import {
  Injectable,
  NestInterceptor,
  Logger,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const body = JSON.stringify(request.body);
    this.logger.log(
      `Received {${request.url}, ${request.method}, ${body}} request`,
    );
    return next.handle().pipe(
      map((response) => {
        const body = JSON.stringify(response);
        this.logger.log(
          `Responsed {${request.url}, ${request.method}, ${body}}`,
        );
        return response;
      }),
    );
  }
}
