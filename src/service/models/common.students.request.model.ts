import { ApiProperty } from '@nestjs/swagger';

export class CommonStudentsRequestModel {
  @ApiProperty({
    name: 'teacher',
    description: 'List of email addresses',
    example: 'teacherken@gmail.com',
  })
  teachers: string[];
}
