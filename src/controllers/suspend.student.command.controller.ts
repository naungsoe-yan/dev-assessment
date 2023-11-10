import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SuspendStudentRequestModel } from '../services/models/suspend.student.request.model';
import { SuspendStudentCommandService } from '../services/suspend.student.command.service';

@Controller('api')
export class SuspendStudentCommandController {
  constructor(private readonly commandService: SuspendStudentCommandService) {}

  @Post('suspend')
  @HttpCode(204)
  suspendStudent(
    @Body() suspendStudentRequestModel: SuspendStudentRequestModel,
  ) {
    this.commandService.suspendStudent(suspendStudentRequestModel);
  }
}
