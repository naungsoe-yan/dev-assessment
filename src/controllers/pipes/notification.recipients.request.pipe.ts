import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEmail, isNotEmpty } from 'class-validator';
import { BaseNotificationRecipientsRequestModel } from '../../services/models/base.notificaiton.recipients.request.model';
import { NotificationRecipientsRequestModel } from '../../services/models/notification.recipients.request.model';

@Injectable()
export class ParseNotificationRecipientsRequestPipe
  implements PipeTransform<NotificationRecipientsRequestModel>
{
  private readonly regex = new RegExp(/@([~\S]*)/, 'g');
  private readonly isItemEmail = (item: string) => isEmail(item, {});

  transform(
    value: BaseNotificationRecipientsRequestModel,
  ): NotificationRecipientsRequestModel {
    const recipients = this.extractRecipientsFrom(value.notification);

    if (!recipients.every(this.isItemEmail)) {
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
