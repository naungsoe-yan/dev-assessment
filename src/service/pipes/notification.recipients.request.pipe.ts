import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { isItemEmail } from '../../common/utils/array.util';
import { NotificationRecipientsRequestModel } from '../models/notificaton.recipients.request.model';
import { ExtendedNotificationRecipientsRequestModel } from '../models/extended.notification.recipients.request.model';

@Injectable()
export class ParseNotificationRecipientsRequestPipe
  implements PipeTransform<NotificationRecipientsRequestModel>
{
  private readonly regex = new RegExp(/@([~\S]*)/, 'g');

  transform(
    value: NotificationRecipientsRequestModel,
  ): ExtendedNotificationRecipientsRequestModel {
    const recipients = [];
    let match = this.regex.exec(value.notification);

    while (isNotEmpty(match)) {
      recipients.push(match[1]);
      match = this.regex.exec(value.notification);
    }

    if (!recipients.every(isItemEmail)) {
      throw new BadRequestException('@mentioned must be an email');
    }

    return {
      ...value,
      recipients: recipients,
    };
  }
}
