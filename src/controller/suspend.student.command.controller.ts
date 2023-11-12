import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SuspendStudentRequestModel } from '../service/models/suspend.student.request.model';
import { SuspendStudentCommandService } from '../service/suspend.student.command.service';

@Controller('api')
export class SuspendStudentCommandController {
  constructor(private readonly commandService: SuspendStudentCommandService) {}

  @Post('suspend')
  @HttpCode(204)
  async suspendStudent(
    @Body() requestModel: SuspendStudentRequestModel,
  ): Promise<void> {
    await this.commandService.suspendStudent(requestModel);
  }
}
