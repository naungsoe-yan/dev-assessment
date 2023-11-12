import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { RegisterStudentsRequestModel } from '../service/models/register.students.request.model';
import { RegisterStudentsCommandService } from '../service/register.students.command.service';

@Controller('api')
export class RegisterStudentsCommandController {
  constructor(
    private readonly commandService: RegisterStudentsCommandService,
  ) {}

  @Post('register')
  @HttpCode(204)
  async registerStudents(
    @Body() requestModel: RegisterStudentsRequestModel,
  ): Promise<void> {
    await this.commandService.registerStudents(requestModel);
  }
}
