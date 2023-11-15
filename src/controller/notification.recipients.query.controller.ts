import { Controller, Header, HttpCode, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParseNotificationRecipientsRequestPipe } from '../service/pipes/notification.recipients.request.pipe';
import { NotificationRecipientsRequestModel } from '../service/models/notificaton.recipients.request.model';
import { ExtendedNotificationRecipientsRequestModel } from '../service/models/extended.notification.recipients.request.model';
import { NotificationRecipientsResponseModel } from '../service/models/notification.recipients.response.model';
import { NotificationRecipientsQueryService } from '../service/notification.recipients.query.service';

@ApiTags('dev-assessments')
@Controller('api')
export class NotificationRecipientsQueryController {
  constructor(
    private readonly queryService: NotificationRecipientsQueryService,
  ) {}

  @ApiOperation({
    summary: 'Retrieve notification recipients',
    description: 'Retrieve students who can receive a given notification',
  })
  @Post('retrievefornotifications')
  @Header('content-type', 'application/json')
  @HttpCode(200)
  async findNotificationRecipientsBy(
    @Body(ParseNotificationRecipientsRequestPipe)
    requestModel: NotificationRecipientsRequestModel,
  ): Promise<NotificationRecipientsResponseModel> {
    return await this.queryService.findNotificationRecipientsBy(
      requestModel as ExtendedNotificationRecipientsRequestModel,
    );
  }
}
