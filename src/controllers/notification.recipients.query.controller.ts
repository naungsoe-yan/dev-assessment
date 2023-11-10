import { Controller, Post, Body } from '@nestjs/common';
import { ParseNotificationRecipientsRequestPipe } from './pipes/notification.recipients.request.pipe';
import { NotificationRecipientsRequestModel } from '../services/models/notification.recipients.request.model';
import { NotificationRecipientsResponseModel } from '../services/models/notification.recipients.response.model';
import { NotificationRecipientsQueryService } from '../services/notification.recipients.query.service';

@Controller('api')
export class NotificationRecipientsQueryController {
  constructor(
    private readonly queryService: NotificationRecipientsQueryService,
  ) {}

  @Post('retrievefornotifications')
  findNotificationRecipients(
    @Body(ParseNotificationRecipientsRequestPipe)
    requestModel: NotificationRecipientsRequestModel,
  ): NotificationRecipientsResponseModel {
    return this.queryService.findNotificationRecipients(requestModel);
  }
}
