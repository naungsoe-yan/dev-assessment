import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsEmail, IsNotEmpty } from 'class-validator';

export class NotificationRecipientsRequestModel {
  @ApiProperty({
    description: 'Email address',
    example: 'teacherken@gmail.com',
  })
  @IsEmail({ ignore_max_length: false })
  @IsNotEmpty()
  teacher: string;

  @ApiProperty({
    description: 'Notification content',
    example: 'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com',
  })
  @MaxLength(5000)
  @IsNotEmpty()
  notification: string;

  constructor(teacher: string, notification: string) {
    this.teacher = teacher;
    this.notification = notification;
  }
}
