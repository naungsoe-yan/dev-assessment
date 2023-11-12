import { Controller, Get, Query } from '@nestjs/common';
import { ParseCommonStudentsRequestPipe } from '../service/pipes/common.students.request.pipe';
import { CommonStudentsRequestModel } from '../service/models/common.students.request.model';
import { CommonStudentsResponseModel } from '../service/models/common.students.response.model';
import { CommonStudentsQueryService } from '../service/common.students.query.service';

@Controller('api')
export class CommonStudentsQueryController {
  constructor(private readonly queryService: CommonStudentsQueryService) {}

  @Get('commonstudents')
  async findCommonStrudents(
    @Query('teacher', ParseCommonStudentsRequestPipe)
    requestModel: CommonStudentsRequestModel,
  ): Promise<CommonStudentsResponseModel> {
    return this.queryService.findCommonStrudents(requestModel);
  }
}
