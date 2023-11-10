import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterStudentsRequestModel {
  @IsEmail()
  @IsNotEmpty()
  teacher: string;

  @IsEmail({}, { each: true })
  @IsNotEmpty()
  students: string[];
}
