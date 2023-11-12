export class NotificationRecipientsResponseModel {
  recipients: string[];

  constructor(recipients: string[]) {
    this.recipients = recipients;
  }
}
