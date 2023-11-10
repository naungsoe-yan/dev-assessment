import { IsEmail, IsNotEmpty } from 'class-validator';

export class BaseNotificationRecipientsRequestModel {
  @IsEmail()
  @IsNotEmpty()
  teacher: string;

  @IsNotEmpty()
  notification: string;
}
