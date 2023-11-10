import { Injectable, Logger } from '@nestjs/common';
import { NotificationRecipientsRequestModel } from './models/notification.recipients.request.model';
import { NotificationRecipientsResponseModel } from './models/notification.recipients.response.model';

@Injectable()
export class NotificationRecipientsQueryService {
  private readonly logger = new Logger(NotificationRecipientsQueryService.name);

  findNotificationRecipients(
    requestModel: NotificationRecipientsRequestModel,
  ): NotificationRecipientsResponseModel {
    return { recipients: requestModel.recipients };
  }
}
