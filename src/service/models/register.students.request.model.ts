import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterStudentsRequestModel {
  @IsEmail({ ignore_max_length: false })
  @IsNotEmpty()
  teacher: string;

  @IsEmail({ ignore_max_length: false }, { each: true })
  @IsNotEmpty()
  students: string[];
}
