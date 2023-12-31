import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterStudentsRequestModel {
  @ApiProperty({
    description: 'Email address',
    example: 'teacherken@gmail.com',
  })
  @IsEmail({ ignore_max_length: false })
  @IsNotEmpty()
  teacher: string;

  @ApiProperty({
    description: 'List of email addresses',
    example: ['studentjon@gmail.com', 'studenthon@gmail.com'],
  })
  @IsEmail({ ignore_max_length: false }, { each: true })
  @ArrayNotEmpty()
  students: string[];

  constructor(teacher: string, students: string[]) {
    this.teacher = teacher;
    this.students = students;
  }
}
