import { IsEmail, IsNotEmpty } from 'class-validator';

export class SuspendStudentRequestModel {
  @IsEmail()
  @IsNotEmpty()
  student: string;
}
