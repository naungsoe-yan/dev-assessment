import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { RegisterStudentsRequestModel } from '../services/models/register.students.request.model';
import { RegisterStudentsCommandService } from '../services/register.students.command.service';

@Controller('api')
export class RegisterStudentsCommandController {
  constructor(
    private readonly commandService: RegisterStudentsCommandService,
  ) {}

  @Post('register')
  @HttpCode(204)
  registerStudents(@Body() requestModel: RegisterStudentsRequestModel) {
    this.commandService.registerStudents(requestModel);
  }
}
