import { Controller, Header, HttpCode, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuspendStudentRequestModel } from '../service/models/suspend.student.request.model';
import { SuspendStudentCommandService } from '../service/suspend.student.command.service';

@ApiTags('dev-assessments')
@Controller('api')
export class SuspendStudentCommandController {
  constructor(private readonly commandService: SuspendStudentCommandService) {}

  @ApiOperation({
    summary: 'Suspend student',
    description: 'Suspend a specified student',
  })
  @Post('suspend')
  @Header('content-type', 'application/json')
  @HttpCode(204)
  async suspendStudent(
    @Body() requestModel: SuspendStudentRequestModel,
  ): Promise<void> {
    await this.commandService.suspendStudent(requestModel);
  }
}
