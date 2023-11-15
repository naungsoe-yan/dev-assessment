import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { NotificationRecipientsQueryService } from '../../../src/service/notification.recipients.query.service';
import { ExtendedNotificationRecipientsRequestModel } from '../../../src/service/models/extended.notification.recipients.request.model';
import { NotificationRecipientsResponseModel } from '../../../src/service/models/notification.recipients.response.model';
import { Teacher } from '../../../src/repository/entities/teacher.entity';
import { StudentRepository } from '../../../src/repository/student.repository';
import { Student } from '../../../src/repository/entities/student.entity';
import { RegistrationRepository } from '../../../src/repository/registration.repository';
import { Registration } from '../../../src/repository/entities/registration.entity';

describe('NotificationRecipientsQueryService', () => {
  let queryService: NotificationRecipientsQueryService;
  let studentRepository: StudentRepository;
  let registrationRepository: RegistrationRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationRecipientsQueryService,
        StudentRepository,
        RegistrationRepository,
        { provide: DataSource, useFactory: createMock<DataSource> },
      ],
    }).compile();

    queryService = await moduleRef.resolve(NotificationRecipientsQueryService);
    studentRepository = await moduleRef.resolve(StudentRepository);
    registrationRepository = await moduleRef.resolve(RegistrationRepository);
  });

  describe('findNotificationRecipientsBy', () => {
    it('should return recipients who are registered to a specified teacher', async () => {
      const teackerKen = new Teacher('teacherken@gmail.com');
      const studentJon = new Student('studentjon@gmail.com');
      const studentHon = new Student('studenthon@gmail.com');
      const registrations = [
        new Registration(teackerKen, studentJon),
        new Registration(teackerKen, studentHon),
      ];
      const requestModel = new ExtendedNotificationRecipientsRequestModel(
        teackerKen.email,
        'Hello students!',
        [],
      );
      const responseModel = new NotificationRecipientsResponseModel([
        studentJon.email,
        studentHon.email,
      ]);
      jest
        .spyOn(registrationRepository, 'findByTeacherEmailAndSuspended')
        .mockImplementation(() => Promise.resolve(registrations));
      jest
        .spyOn(studentRepository, 'find')
        .mockImplementation(() => Promise.resolve([studentJon, studentHon]));
      const result =
        await queryService.findNotificationRecipientsBy(requestModel);
      expect(
        registrationRepository.findByTeacherEmailAndSuspended,
      ).toHaveBeenCalled();
      expect(result).toStrictEqual(responseModel);
    });

    it('should return recipients who can receive a given notification', async () => {
      const teackerKen = new Teacher('teacherken@gmail.com');
      const studentJon = new Student('studentjon@gmail.com');
      const studentHon = new Student('studenthon@gmail.com');
      const studentEve = new Student('studenteve@gmail.com');
      const registrations = [
        new Registration(teackerKen, studentJon),
        new Registration(teackerKen, studentHon),
      ];
      const requestModel = new ExtendedNotificationRecipientsRequestModel(
        teackerKen.email,
        `Hello students! @${studentJon.email} @${studentHon.email} @${studentHon.email}`,
        [studentJon.email, studentHon.email, studentEve.email],
      );
      const responseModel = new NotificationRecipientsResponseModel(
        [studentJon.email, studentHon.email, studentEve.email].sort(),
      );
      jest
        .spyOn(registrationRepository, 'findByTeacherEmailAndSuspended')
        .mockImplementation(() => Promise.resolve(registrations));
      jest
        .spyOn(studentRepository, 'findByEmailsAndSuspended')
        .mockImplementation(() => Promise.resolve([studentEve]));
      const result =
        await queryService.findNotificationRecipientsBy(requestModel);
      expect(
        registrationRepository.findByTeacherEmailAndSuspended,
      ).toHaveBeenCalled();
      expect(result).toStrictEqual(responseModel);
    });
  });
});
