import { BadRequestException } from '@nestjs/common';
import { ParseNotificationRecipientsRequestPipe } from '../../../../src/service/pipes/notification.recipients.request.pipe';
import { NotificationRecipientsRequestModel } from '../../../../src/service/models/notificaton.recipients.request.model';

describe('ParseNotificationRecipientsRequestPipe', () => {
  let requestPipe: ParseNotificationRecipientsRequestPipe;

  beforeEach(async () => {
    requestPipe = new ParseNotificationRecipientsRequestPipe();
  });

  describe('transform', () => {
    it('should throw exception if value is empty', async () => {
      const requestModel = new NotificationRecipientsRequestModel(
        'teacherken@gmail.com',
        'Hello students! @not-an-email',
      );
      expect(() => requestPipe.transform(requestModel)).toThrow(
        BadRequestException,
      );
    });

    it('should return ', async () => {
      const studentEmail = 'studentjon@gmail.com';
      const requestModel = new NotificationRecipientsRequestModel(
        'teacherken@gmail.com',
        `Hello students! @${studentEmail}`,
      );
      const result = requestPipe.transform(requestModel);
      expect(result.recipients).toStrictEqual([studentEmail]);
    });
  });
});
