import { Controller, Header, HttpCode, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterStudentsRequestModel } from '../service/models/register.students.request.model';
import { RegisterStudentsCommandService } from '../service/register.students.command.service';

@ApiTags('dev-assessments')
@Controller('api')
export class RegisterStudentsCommandController {
  constructor(
    private readonly commandService: RegisterStudentsCommandService,
  ) {}

  @ApiOperation({
    summary: 'Register students',
    description: 'Register one or more students to a specified teacher',
  })
  @Post('register')
  @Header('content-type', 'application/json')
  @HttpCode(204)
  async registerStudents(
    @Body() requestModel: RegisterStudentsRequestModel,
  ): Promise<void> {
    await this.commandService.registerStudents(requestModel);
  }
}
