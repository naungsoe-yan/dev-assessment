import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SuspendStudentRequestModel {
  @ApiProperty({
    description: 'Email address',
    example: 'studenthon@gmail.com',
  })
  @IsEmail({ ignore_max_length: false })
  @IsNotEmpty()
  student: string;

  constructor(student: string) {
    this.student = student;
  }
}
