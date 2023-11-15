import { NotificationRecipientsRequestModel } from './notificaton.recipients.request.model';

export class ExtendedNotificationRecipientsRequestModel extends NotificationRecipientsRequestModel {
  recipients: string[];

  constructor(teacher: string, notification: string, recipients: string[]) {
    super(teacher, notification);
    this.recipients = recipients;
  }
}
