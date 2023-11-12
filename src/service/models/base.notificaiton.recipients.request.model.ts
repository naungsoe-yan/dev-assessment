import { MaxLength, IsEmail, IsNotEmpty } from 'class-validator';

export class BaseNotificationRecipientsRequestModel {
  @IsEmail({ ignore_max_length: false })
  @IsNotEmpty()
  teacher: string;

  @MaxLength(5000)
  @IsNotEmpty()
  notification: string;
}
