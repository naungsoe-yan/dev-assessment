import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { GlobalExceptionFilter } from './common/filters/global.exception.filter';
import { RegisterStudentsCommandController } from './controller/register.students.command.controller';
import { CommonStudentsQueryController } from './controller/common.students.query.controller';
import { SuspendStudentCommandController } from './controller/suspend.student.command.controller';
import { NotificationRecipientsQueryController } from './controller/notification.recipients.query.controller';
import { RegisterStudentsCommandService } from './service/register.students.command.service';
import { CommonStudentsQueryService } from './service/common.students.query.service';
import { SuspendStudentCommandService } from './service/suspend.student.command.service';
import { NotificationRecipientsQueryService } from './service/notification.recipients.query.service';
import { Teacher } from './repository/entities/teacher.entity';
import { Student } from './repository/entities/student.entity';
import { Registration } from './repository/entities/registration.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_SCHEMA'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Teacher, Student, Registration]),
  ],
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
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
