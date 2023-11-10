import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './interceptors/global.exception.filter';
import { ContentTypeInterceptor } from './interceptors/content.type.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { RegisterStudentsCommandController } from './controllers/register.students.command.controller';
import { CommonStudentsQueryController } from './controllers/common.students.query.controller';
import { SuspendStudentCommandController } from './controllers/suspend.student.command.controller';
import { NotificationRecipientsQueryController } from './controllers/notification.recipients.query.controller';
import { RegisterStudentsCommandService } from './services/register.students.command.service';
import { CommonStudentsQueryService } from './services/common.students.query.service';
import { SuspendStudentCommandService } from './services/suspend.student.command.service';
import { NotificationRecipientsQueryService } from './services/notification.recipients.query.service';

@Module({
  imports: [],
  controllers: [
    RegisterStudentsCommandController,
    CommonStudentsQueryController,
    SuspendStudentCommandController,
    NotificationRecipientsQueryController,
  ],
  providers: [
    RegisterStudentsCommandService,
    CommonStudentsQueryService,
    SuspendStudentCommandService,
    NotificationRecipientsQueryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ContentTypeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
