import { IsEmail, IsNotEmpty } from 'class-validator';

export class SuspendStudentRequestModel {
  @IsEmail({ ignore_max_length: false })
  @IsNotEmpty()
  student: string;
}
