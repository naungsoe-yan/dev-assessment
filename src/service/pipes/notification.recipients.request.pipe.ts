import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { isItemEmail } from '../../common/utils/array.util';
import { BaseNotificationRecipientsRequestModel } from '../models/base.notificaiton.recipients.request.model';
import { NotificationRecipientsRequestModel } from '../models/notification.recipients.request.model';

@Injectable()
export class ParseNotificationRecipientsRequestPipe
  implements PipeTransform<NotificationRecipientsRequestModel>
{
  private readonly regex = new RegExp(/@([~\S]*)/, 'g');

  transform(
    value: BaseNotificationRecipientsRequestModel,
  ): NotificationRecipientsRequestModel {
    const recipients = this.extractRecipientsFrom(value.notification);

    if (!recipients.every(isItemEmail)) {
      throw new BadRequestException(
        '@mentioned in the notification must be an email',
      );
    }

    return {
      ...value,
      recipients: recipients,
    };
  }

  private extractRecipientsFrom(notification: string): string[] {
    const recipients = [];
    let match = this.regex.exec(notification);

    while (isNotEmpty(match)) {
      recipients.push(match[1]);
      match = this.regex.exec(notification);
    }

    return recipients;
  }
}
