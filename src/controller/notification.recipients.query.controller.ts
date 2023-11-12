import { Controller, Post, Body } from '@nestjs/common';
import { ParseNotificationRecipientsRequestPipe } from '../service/pipes/notification.recipients.request.pipe';
import { NotificationRecipientsRequestModel } from '../service/models/notification.recipients.request.model';
import { NotificationRecipientsResponseModel } from '../service/models/notification.recipients.response.model';
import { NotificationRecipientsQueryService } from '../service/notification.recipients.query.service';

@Controller('api')
export class NotificationRecipientsQueryController {
  constructor(
    private readonly queryService: NotificationRecipientsQueryService,
  ) {}

  @Post('retrievefornotifications')
  async findNotificationRecipients(
    @Body(ParseNotificationRecipientsRequestPipe)
    requestModel: NotificationRecipientsRequestModel,
  ): Promise<NotificationRecipientsResponseModel> {
    return this.queryService.findNotificationRecipients(requestModel);
  }
}
