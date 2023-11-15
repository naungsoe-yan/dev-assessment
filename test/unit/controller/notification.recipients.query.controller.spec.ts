import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { NotificationRecipientsQueryController } from '../../../src/controller/notification.recipients.query.controller';
import { NotificationRecipientsQueryService } from '../../../src/service/notification.recipients.query.service';
import { NotificationRecipientsRequestModel } from '../../../src/service/models/notificaton.recipients.request.model';
import { NotificationRecipientsResponseModel } from '../../../src/service/models/notification.recipients.response.model';
import { StudentRepository } from '../../../src/repository/student.repository';
import { RegistrationRepository } from '../../../src/repository/registration.repository';

describe('NotificationRecipientsQueryController', () => {
  let queryController: NotificationRecipientsQueryController;
  let queryService: NotificationRecipientsQueryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [NotificationRecipientsQueryController],
      providers: [
        NotificationRecipientsQueryService,
        StudentRepository,
        RegistrationRepository,
        { provide: DataSource, useFactory: createMock<DataSource> },
      ],
    }).compile();

    queryController = await moduleRef.resolve(
      NotificationRecipientsQueryController,
    );
    queryService = await moduleRef.resolve(NotificationRecipientsQueryService);
  });

  describe('findNotificationRecipientsBy', () => {
    it('should return students who can receive a given notification', async () => {
      const requestModel = new NotificationRecipientsRequestModel(
        'studenthon@gmail.com',
        'Hello students! @studentjon@gmail.com @studenthon@gmail.com @studenteve@gmail.com',
      );
      const responseModel = new NotificationRecipientsResponseModel([
        'studentjon@gmail.com',
      ]);
      jest
        .spyOn(queryService, 'findNotificationRecipientsBy')
        .mockImplementation(() => Promise.resolve(responseModel));
      const result =
        await queryController.findNotificationRecipientsBy(requestModel);
      expect(queryService.findNotificationRecipientsBy).toHaveBeenCalled();
      expect(result).toBe(responseModel);
    });
  });
});
